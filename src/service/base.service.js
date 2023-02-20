const validate = require('validate.js');

module.exports = class BaseService {

    constructor(schema, model) {
        this.schema = schema;
        this.model = model;
    }

    async validation(user) {
        return validate(user, this.schema);
    };

    async buildErrorMessage(errors){
        let errorMessage = '';

        for(let i in errors){
            errorMessage+=errors[i];
        }

        return errorMessage;
    };

    async getSession() {
        return await this.model.startSession();
    }

    async save(obj, session) {
        return obj.isNew ? await obj.save({session: session}) : await this.model.findByIdAndUpdate(obj.id, obj, {new: true}).session(session);
    };

    async saveMany(objs, session) {
        return await this.model.insertMany(objs).session(session);
    };

    async findAll() {
        return await this.model.find().exec();
    };

    async findById(id) {
        return await this.model.findById(id).exec();
    };

    async findByIdAndDelete(id) {
        return await this.model.findByIdAndDelete(id).exec();
    };

    async findByManyIds(ids, key = '_id') {
        let filter = {};
        filter[key] = {$in: ids};

        return await this.model.find(filter).exec();
    };

    async findOneBy(key, value) {
        let filter = {};
        filter[key] = value;
        return await this.model.findOne(filter).exec();
    };

    async findBy(key, value) {
        let filter = {};
        filter[key] = value;
        return await this.model.find(filter).exec();
    };

    async find(filter) {
        return await this.model.find(filter).exec();
    };

    async findSelect(filter, select = null) {
        if (select) {
            return await this.model.find(filter).select(select).exec();
        }

        return await this.find(filter);
    };

    async findPopulate(filter = {}, pathsValues) {

        let query = this.model.find(filter);

        for (let ipv in pathsValues) {
            const pathValue = pathsValues[ipv];
            query = query.populate(pathValue);
        }

        return await query.exec();
    };

    async findAndSort(filter, sortFilter) {
        return await this.model.find(filter).sort(sortFilter).exec();
    };

    async findAndSortWithLimit(filter, sortFilter, limit) {
        return await this.model.find(filter).sort(sortFilter).limit(limit).exec();
    };

    async findOne(filter) {
        return await this.model.findOne(filter).exec();
    };

    async paginate(query, options) {
        return await this.model.paginate(query, options);
    };

    async deleteOne(filter) {
        return await this.model.deleteOne(filter).exec();
    };

    async count(filter = {}) {
        return await this.model.countDocuments(filter).exec();
    };

    async groupByFieldCount(field, filters = {}, sortDirection = 1) {
        field = '$'+field;
        return await this.model.aggregate(
            [
                {
                    $match: filters
                },
                {
                    $group : {
                        _id: field,
                        count : { $sum : 1 }
                    }
                },
                {
                    $sort: {_id: sortDirection}
                }
            ]
        ).exec();
    };

    async groupByFieldCountMany(field, filters = {}, sortDirection = 1) {
        const queryField = '$'+field;
        let details = {};
        details[field] = '$_id';
        details['count'] = '$count';
        const fieldDetailsObj = {
            $push: details
        };

        return await this.model.aggregate(
            [
                {
                    $match: filters
                },
                {
                    $unwind: queryField
                },
                {
                    $group: {
                        _id: queryField,
                        count:{ $sum: 1 }
                    }
                },
                {
                    $group: {
                        _id : null,
                        fieldDetails: fieldDetailsObj
                    }
                },
                {
                    $project: {
                        _id: 0,
                        fieldDetails: 1
                    }
                },
                {
                    $sort: {_id: sortDirection}
                }
            ]
        ).exec();
    };

    async groupByDateFieldCount(filters = {}, format = '%Y-%m-%d', sortDirection = 1, dateField = 'createdAt') {
        dateField = '$'+dateField;
        return await this.model.aggregate(
            [
                {
                    $match: filters
                },
                {
                    $group : {
                        _id: { $dateToString: { format: format, date: dateField } },
                        count : { $sum : 1 }
                    }
                },
                {
                    $sort: {_id: sortDirection}
                }
            ]
        ).exec();
    };
}