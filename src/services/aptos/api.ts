import { baseApi } from 'api/api'

const aptosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBalance: build.query<{ balance: number,rate:number },void>({
      query: () => ({
        url: '/aptos/',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'Balance', id: 'BALANCE' }],
    }),
    editReplenishBalance: build.mutation<string, string >({
      query: (body) => ({
        url: '/aptos/',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: [{ type: 'Balance', id: 'BALANCE' }],
    }),
     }),
})
export const {
  useGetBalanceQuery,
  useEditReplenishBalanceMutation
} = aptosApi
