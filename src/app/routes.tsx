import { createBrowserRouter } from "react-router";
import { LinkInput } from "./components/LinkInput";
import { LayoutSelection } from "./components/LayoutSelection";
import { CustomizationView } from "./components/CustomizationView";
import { PublishConfirmation } from "./components/PublishConfirmation";
import { TVDisplay } from "./components/TVDisplay";
import { PublishedContent } from "./components/PublishedContent";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LinkInput,
  },
  {
    path: "/layouts",
    Component: LayoutSelection,
  },
  {
    path: "/customize",
    Component: CustomizationView,
  },
  {
    path: "/published",
    Component: PublishConfirmation,
  },
  {
    path: "/tv-display",
    Component: TVDisplay,
  },
  {
    path: "/content-library",
    Component: PublishedContent,
  },
]);