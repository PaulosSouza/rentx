import { container } from "tsyringe";

import DayjsDateProvider from "./DateProvider/implementations/DayjsDateProvider";
import IDateProvider from "./DateProvider/interfaces/IDateProvider";
import EtherealMailProvider from "./MailProvider/implementatinos/EtherealMailProvider";
import IMailProvider from "./MailProvider/interfaces/IMailProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

container.registerSingleton<IMailProvider>(
  "MailProvider",
  EtherealMailProvider
);
