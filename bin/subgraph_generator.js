const Handlebars = require("handlebars");
const path = require("path");
const fs = require("fs-extra");

let templateValues = network => {
  let address;

  switch (network.toLowerCase()) {
    case "local-dev":
      address = "0x559247Ec8A8771E8C97cDd39b96b9255651E39C5";
      break;
    case "kovan":
      address = "0x0B9fe963b789151E53b8bd601590Ea32F9f2453D";
      break;
    case "rinkeby":
      address = "0xD8C88BE5e8EB88E38E6ff5cE186d764676012B0b";
      break;
    case "mainnet":
      address = "0x3d5409CcE1d45233dE1D4eBDEe74b8E004abDD13";
      break;
  }

  return { unlockContractAddress: address };
};

let generate = async () => {
  const subgraphTemplateFilePath = path.join(
    __dirname,
    "..",
    "subgraph.template.yaml"
  );

  const source = await fs.readFile(subgraphTemplateFilePath, "utf-8");
  const template = Handlebars.compile(source);
  const result = template(templateValues("local-dev"));
  await fs.writeFile(path.join(__dirname, "..", "subgraph.yaml"), result);  
};

generate();
