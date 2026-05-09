import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ServiceSawmilling from "./pages/ServiceSawmilling";
import ServiceLumber from "./pages/ServiceLumber";
import ServiceFurniture from "./pages/ServiceFurniture";
import ServiceTreeReuse from "./pages/ServiceTreeReuse";
import ServiceLogTransport from "./pages/ServiceLogTransport";
import ServiceTreeCare from "./pages/ServiceTreeCare";
import ServiceMillworks from "./pages/ServiceMillworks";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import StinsonGallery from "./pages/StinsonGallery";
import OmegaGallery from "./pages/OmegaGallery";
import IBeamGallery from "./pages/IBeamGallery";
import PecanBunkerGallery from "./pages/PecanBunkerGallery";
import FamilyLegacyGallery from "./pages/FamilyLegacyGallery";
import GoldWalnutGallery from "./pages/GoldWalnutGallery";
import HillcoGallery from "./pages/HillcoGallery";
import PecanTrestleGallery from "./pages/PecanTrestleGallery";
import Blog from "./pages/Blog";
import AustinStateHospital from "./pages/BlogArticles/AustinStateHospital";
import InksLakeSP from "./pages/BlogArticles/InksLakeSP";
import HillcoPartners from "./pages/BlogArticles/HillcoPartners";
import StinsonGalleryBlog from "./pages/BlogArticles/StinsonGallery";
import WoodInnovationsGrant from "./pages/BlogArticles/WoodInnovationsGrant";
import ClimateSmartProjects from "./pages/BlogArticles/ClimateSmartProjects";
import TreeReuseUrban from "./pages/BlogArticles/TreeReuseUrban";
import SustainableFurnitureDesign from "./pages/BlogArticles/SustainableFurnitureDesign";
import StinsonTest from "./pages/BlogArticles/StinsonTest";
import CommunityImpactStories from "./pages/BlogArticles/CommunityImpactStories";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/?"} component={Home} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/austin-state-hospital"} component={AustinStateHospital} />
      <Route path={"/blog/inks-lake-sp"} component={InksLakeSP} />
      <Route path={"/blog/hillco-partners"} component={HillcoPartners} />
      <Route path={"/blog/stinson-gallery"} component={StinsonGalleryBlog} />
      <Route path={"/blog/wood-innovations-grant"} component={WoodInnovationsGrant} />
      <Route path={"/blog/climate-smart-projects"} component={ClimateSmartProjects} />
      <Route path={"/blog/tree-reuse-urban-development"} component={TreeReuseUrban} />
      <Route path={"/blog/sustainable-furniture-design"} component={SustainableFurnitureDesign} />
      <Route path={"/blog/stinson-test"} component={StinsonTest} />
      <Route path={"/blog/community-impact-stories"} component={CommunityImpactStories} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/stinson-gallery"} component={StinsonGallery} />
      <Route path={"/omega-gallery"} component={OmegaGallery} />
      <Route path={"/ibeam-gallery"} component={IBeamGallery} />
      <Route path={"/pecan-bunker-gallery"} component={PecanBunkerGallery} />
      <Route path={"/family-legacy-gallery"} component={FamilyLegacyGallery} />
      <Route path={"/gold-walnut-gallery"} component={GoldWalnutGallery} />
      <Route path={"/hillco-gallery"} component={HillcoGallery} />
      <Route path={"/pecan-trestle-gallery"} component={PecanTrestleGallery} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/services"} component={Services} />
      <Route path={"/services/lumber"} component={ServiceLumber} />
      <Route path={"/services/sawmilling"} component={ServiceSawmilling} />
      <Route path={"/services/furniture"} component={ServiceFurniture} />
      <Route path={"/services/tree-reuse"} component={ServiceTreeReuse} />
      <Route path={"/services/log-transport"} component={ServiceLogTransport} />
      <Route path={"/services/tree-care"} component={ServiceTreeCare} />
      <Route path={"/services/millworks"} component={ServiceMillworks} />
      <Route path={"/404"} component={NotFound} />      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
