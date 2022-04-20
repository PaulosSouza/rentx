import { container } from "tsyringe";

import DayjsDateProvider from "./DateProvider/implementations/DayjsDateProvider";
import IDateProvider from "./DateProvider/interfaces/IDateProvider";
import EtherealMailProvider from "./MailProvider/implementatinos/EtherealMailProvider";
import IMailProvider from "./MailProvider/interfaces/IMailProvider";
import LocalStorageProvider from "./StorageProvider/implementations/LocalStorageProvider";
import S3StorageProvider from "./StorageProvider/implementations/S3StorageProvider";
import IStorageProvider from "./StorageProvider/interfaces/IStorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

container.registerSingleton<IMailProvider>(
  "MailProvider",
  EtherealMailProvider
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.DISK]
);
