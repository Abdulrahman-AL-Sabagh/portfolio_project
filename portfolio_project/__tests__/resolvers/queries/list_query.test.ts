/** @format */
import {
  createTestUser,
  createTestList,
} from "test_data/test_create_mutations";
import { listData } from "test_data/test_data";
import { testServerConfig } from "test_data/test_config";
import { deleteTestUser } from "test_data/test_delete_mutations";
import { result } from "lodash";
import { ApolloClient, gql } from "@apollo/client";
import { getTestUser } from "test_data/test_queries";
import { listProperties } from "test_data/schema_peroperties";

let server: ApolloClient<any>;
describe("List query", () => {
  beforeAll(() => (server = new ApolloClient(testServerConfig)));
  beforeEach(async () => {
    const userExists = await getTestUser(server);
    if (userExists.data.user) await deleteTestUser(server);
    await createTestUser(server);
  });
  afterEach(() => deleteTestUser(server));
  afterAll(() => server.stop());
  it("Should find a list using the provided id", async () => {
    await createTestList(server);
    const getList = gql`
      query List($id: ID!) {
        list(id: $id) {
          ${listProperties}
        }
      }
    `;
    const { data } = await server.query({
      query: getList,
      variables: { id: listData.id },
    });

    const result = data.list;
    expect(result).toEqual({ ...listData, __typename: result.__typename });
  });
});
