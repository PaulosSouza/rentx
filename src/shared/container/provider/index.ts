import { container } from "tsyringe";

import DayjsDateProvider from "./DateProvider/implementations/DayjsDateProvider";
import IDateProvider from "./DateProvider/interfaces/IDateProvider";
import EtherealMailProvider from "./MailProvider/implementatinos/EtherealMailProvider";
import IMailProvider from "./MailProvider/interfaces/IMailProvider";
import LocalStorageProvider from "./StorageProvider/implementations/LocalStorageProvider";
import IStorageProvider from "./StorageProvider/interfaces/IStorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

container.registerSingleton<IMailProvider>(
  "MailProvider",
  EtherealMailProvider
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);
