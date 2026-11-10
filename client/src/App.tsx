import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ContactModalLinkBridge } from "./components/ContactFormModal";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import ServiceSawmilling from "./pages/ServiceSawmilling";
import ServiceLumber from "./pages/ServiceLumber";

import ServiceTreeReuse from "./pages/ServiceTreeReuse";
import ServiceLogTransport from "./pages/ServiceLogTransport";
import ServiceTreeCare from "./pages/ServiceTreeCare";
import ServiceMillworks from "./pages/ServiceMillworks";
import ServiceCadLaser from "./pages/ServiceCadLaser";
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
import LegacyTexasParksWildlife from "./pages/BlogArticles/LegacyTexasParksWildlife";
import LegacyTreeRemoval from "./pages/BlogArticles/LegacyTreeRemoval";
import LegacyUrbanWoodBenefits from "./pages/BlogArticles/LegacyUrbanWoodBenefits";
import LegacyWoodDefinitions from "./pages/BlogArticles/LegacyWoodDefinitions";
import LegacyCircularEconomy from "./pages/BlogArticles/LegacyCircularEconomy";
import Shop from "./pages/Shop";
import ShopListing from "./pages/ShopListing";
import ShopLumberSlabs from "./pages/ShopLumberSlabs";
import ShopFurniture from "./pages/ShopFurniture";
import ShopHomeDecor from "./pages/ShopHomeDecor";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminPricing from "./pages/AdminPricing";
import { CartProvider } from "./lib/cart";

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
      <Route path={"/blog/texas-parks-wildlife-award"} component={LegacyTexasParksWildlife} />
      <Route path={"/blog/tree-service-partnership"} component={LegacyTreeRemoval} />
      <Route path={"/blog/urbanwoodbenefits"} component={LegacyUrbanWoodBenefits} />
      <Route path={"/blog/what-is-urban-rescued-salvaged-reclaimed-wood"} component={LegacyWoodDefinitions} />
      <Route path={"/blog/circular-economy"} component={LegacyCircularEconomy} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/shop/lumber-slabs"} component={ShopLumberSlabs} />
      <Route path={"/shop/lumber-slabs/slabs"} component={() => <ShopListing category="Slabs" pageTitle="Live Edge Slabs" pageDesc="Browse rescued Texas wood slabs with verified photographs, dimensions, and live board-foot pricing. Local pickup in Dripping Springs." slug="slabs" />} />
      <Route path={"/shop/lumber-slabs/mantels"} component={() => <ShopListing category="Mantels" pageTitle="Wood Mantels" pageDesc="Explore rescued Texas wood mantels with verified dimensions, photographs, and live species pricing for local pickup." slug="mantels" />} />
      <Route path={"/shop/lumber-slabs/cookies-rounds"} component={() => <ShopListing category="Cookies & Rounds" pageTitle="Cookies & Rounds" pageDesc="Browse approved wood cookies and rounds as complete inventory records become available." slug="cookies-rounds" />} />
      <Route path={"/shop/lumber-slabs/beams"} component={() => <ShopListing category="Beams" pageTitle="Wood Beams" pageDesc="Browse approved rescued wood beams with complete dimensions, photographs, and pricing." slug="beams" />} />
      <Route path={"/shop/lumber-slabs/dimensional-lumber"} component={() => <ShopListing category="Dimensional Lumber" pageTitle="Dimensional Lumber" pageDesc="Browse approved dimensional lumber inventory for woodworking and construction projects." slug="dimensional-lumber" />} />
      <Route path={"/shop/furniture"} component={ShopFurniture} />
      <Route path={"/shop/home-decor"} component={ShopHomeDecor} />
      <Route path={"/shop/product/:id"} component={ProductDetail} />
      <Route path={"/shop/cart"} component={Cart} />
      <Route path={"/shop/checkout"} component={Checkout} />
      <Route path={"/cart"} component={Cart} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/admin/pricing"} component={AdminPricing} />
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
      <Route path={"/about-us"} component={AboutUs} />
      <Route path={"/learn-more"} component={() => <Redirect to="/about-us" />} />
      <Route path={"/services"} component={Services} />
      <Route path={"/services/lumber"} component={ServiceLumber} />
      <Route path={"/services/sawmilling"} component={ServiceSawmilling} />
      <Route path={"/services/furniture"} component={() => <Redirect to="/portfolio" />} />
      <Route path={"/services/tree-reuse"} component={ServiceTreeReuse} />
      <Route path={"/services/log-transport"} component={ServiceLogTransport} />
      <Route path={"/services/tree-care"} component={ServiceTreeCare} />
      <Route path={"/services/millworks"} component={ServiceMillworks} />
      <Route path={"/services/cad-laser-services"} component={ServiceCadLaser} />
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
          <CartProvider>
            <Router />
            <ContactModalLinkBridge />
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
