import { FilterQuery, UpdateQuery } from 'mongoose'
import { Model } from 'mongoose'

export const genericDal = <T, I>(model: Model<T>) => ({
  find: (query?: FilterQuery<T>) =>
    query ? model.find(query).lean().exec() : model.find().lean().exec(),
  findById: (id: string) => model.findById(id).exec(),
  findOne: (query: FilterQuery<T>) => model.findOne(query).exec(),
  save: (input: I) => model.create(input),
  update: (id: string, update: UpdateQuery<T>) =>
    model.findByIdAndUpdate(id, update, { new: true }).lean().exec(),
  // TODO: Figure out why I can't do a general "delete"
  // Error is about "not a portable type" and needing a "type declaration"
  // delete: (query?: FilterQuery<T>) =>
  //   query
  //     ? model.deleteMany(query).lean().exec()
  //     : model.deleteMany().lean().exec(),

  deleteById: (id: string) => model.findByIdAndDelete(id).lean().exec(),

  /********************************************
   * Sensitive queries
   *
   * Unlike the standard set of queries these
   * potentially return sensitive data.
   *
   * It is the responsibility of the caller to
   * select only information that's relevant.
   *
   * Use of these should be accompanied by
   * scrubbing sensitive data prior to
   * transmission
   * ******************************************/
  findOneSensitive: (query: FilterQuery<T>) => model.findOne(query),

  findSensitive: (query: FilterQuery<T>) => model.find(query),

  findByIdSensitive: (id: string) => model.findById(id),

  updateSensitive: (id: string, update: UpdateQuery<T>) =>
    model.findByIdAndUpdate(id, update, { new: true }),
})
