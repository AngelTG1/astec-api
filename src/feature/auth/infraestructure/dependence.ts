import { MySQLUserRepositoryImpl } from "./db/MySQLUserRepositoryImpl";

import { RegisterUserUseCase } from "../application/usecases/registerUser_usecase";
import { LoginUserUseCase } from "../application/usecases/loginUser_usecase";
import { UpdateUserUseCase } from "../application/usecases/updateUser_usecase";
import { GetAllUsersUseCase } from "../application/usecases/getAllUsers_usecase";

import { RegisterUserController } from "./controllers/registerUser_controller";
import { LoginUserController } from "./controllers/loginUser_controller";
import { UpdateUserController } from "./controllers/updateUser_controller";
import { GetAllUsersController } from "./controllers/getAllUsers_controller";

// Repo
const mysqlUserRepo = new MySQLUserRepositoryImpl();

// Register
const registerUserUseCase = new RegisterUserUseCase(mysqlUserRepo);
export const registerUserController =
  new RegisterUserController(registerUserUseCase);

// Login
const loginUserUseCase = new LoginUserUseCase(mysqlUserRepo);
export const loginUserController =
  new LoginUserController(loginUserUseCase);

// Update
const updateUserUseCase = new UpdateUserUseCase(mysqlUserRepo);
export const updateUserController =
  new UpdateUserController(updateUserUseCase);

// Get all users
const getAllUsersUseCase = new GetAllUsersUseCase(mysqlUserRepo);
export const getAllUsersController =
  new GetAllUsersController(getAllUsersUseCase);
