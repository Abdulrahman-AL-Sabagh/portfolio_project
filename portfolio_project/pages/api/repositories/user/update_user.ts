import { User } from "@prisma/client";
import UserEntity from "../../entities/User";
import { UserRepoFunctions } from "../repo-types";
import { allUserData } from "../UserRepository";
import findOne from "./find_one_user";

const update = async (
    user: User,
    prisma: UserRepoFunctions
  ): Promise<UserEntity> => {
    const userExists = await findOne(user.id, prisma);
    if (!userExists) {
      throw new Error("User does not exists");
    }
    const updatedUser = await prisma.update({
      data: allUserData(user),
      where: { id: user.id },
    });
    return new UserEntity(updatedUser);
  };

  export default update;