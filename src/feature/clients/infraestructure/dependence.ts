import { CreateClientUseCase } from "../application/usecases/createClient_usecase";
import { CreateClientController } from "./controllers/createClient_controller";
import { MySQLClientRepositoryImpl } from "./db/MySQLClientRepositoryImpl";
import { GetAllClientsUseCase } from "../application/usecases/getAllClients_usecase";
import { GetClientByUuidUseCase } from "../application/usecases/getClientByUuid_usecase";
import { GetAllClientsController } from "./controllers/getAllClients_controller";
import { GetClientByUuidController } from "./controllers/getClientByUuid_controller";

const mysqlRepository = new MySQLClientRepositoryImpl();
const createClientUseCase = new CreateClientUseCase(mysqlRepository);
export const createClientController = new CreateClientController(createClientUseCase);

const getAllClientsUseCase = new GetAllClientsUseCase(mysqlRepository);
export const getAllClientsController = new GetAllClientsController(getAllClientsUseCase);

const getClientByUuidUseCase = new GetClientByUuidUseCase(mysqlRepository);
export const getClientByUuidController = new GetClientByUuidController(getClientByUuidUseCase);
