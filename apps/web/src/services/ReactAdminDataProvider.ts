import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin';
import {PogledajApi} from './ApiHelper';
import {stringify} from 'querystring';

const ReactAdminDataProvider: DataProvider = {
  async create(resource: string, params: CreateParams): Promise<CreateResult> {
    return PogledajApi.post(`${resource}`, params.data);
  },
  async delete(resource: string, params: DeleteParams): Promise<DeleteResult> {
    return PogledajApi.delete(`${resource}/${params.id}`);
  },
  async deleteMany(resource: string, params: DeleteManyParams): Promise<DeleteManyResult> {
    const query = {
      filter: JSON.stringify({id: params.ids}),
    };

    return PogledajApi.delete(`${resource}?${stringify(query)}`);
  },
  async getList(resource: string, params: GetListParams): Promise<GetListResult> {
    const {page, perPage} = params.pagination;
    const {field, order} = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${resource}?${stringify(query)}`;

    return PogledajApi.get(url);
  },
  async getMany(resource: string, params: GetManyParams): Promise<GetManyResult> {
    const query = {
      filter: JSON.stringify({ids: params.ids}),
    };
    const url = `${resource}?${stringify(query)}`;
    return PogledajApi.get(url);
  },
  async getManyReference(resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult> {
    const {page, perPage} = params.pagination;
    const {field, order} = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${resource}?${stringify(query)}`;
    return PogledajApi.get(url);
  },
  async getOne(resource: string, params: GetOneParams): Promise<GetOneResult> {
    return PogledajApi.get(`${resource}/${params.id}`);
  },
  async update(resource: string, params: UpdateParams): Promise<UpdateResult> {
    return PogledajApi.put(`${resource}/${params.id}`, params.data);
  },
  async updateMany(resource: string, params: UpdateManyParams): Promise<UpdateManyResult> {
    const query = {
      filter: JSON.stringify({id: params.ids}),
    };

    return PogledajApi.put(`${resource}?${stringify(query)}`, params.data);
  },
};

export default ReactAdminDataProvider;