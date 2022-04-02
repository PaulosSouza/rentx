import { container } from "tsyringe";

import DayjsDateProvider from "./DateProvider/implementations/DayjsDateProvider";
import IDateProvider from "./DateProvider/interfaces/IDateProvider";
import EtherealMailProvider from "./IMailProvider/implementatinos/EtherealMailProvider";
import IMailProvider from "./IMailProvider/interfaces/IMailProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

container.registerSingleton<IMailProvider>(
  "MailProvider",
  EtherealMailProvider
);
