import { MySQLUserRepositoryImpl } from "./db/MySQLUserRepositoryImpl";

import { RegisterUserUseCase } from "../application/usecases/registerUser_usecase";
import { LoginUserUseCase } from "../application/usecases/loginUser_usecase";

import { RegisterUserController } from "./controllers/registerUser_controller";
import { LoginUserController } from "./controllers/loginUser_controller";

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
