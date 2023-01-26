import { AppRegistry } from "react-native";
import Index from "./App/index";

AppRegistry.registerComponent("App", () => Index);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});