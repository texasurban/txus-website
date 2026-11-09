import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./lib/cart";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import ServiceSawmilling from "./pages/ServiceSawmilling";
import ServiceLumber from "./pages/ServiceLumber";
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
import Shop from "./pages/Shop";
import ShopLumberSlabs from "./pages/ShopLumberSlabs";
import ShopListing from "./pages/ShopListing";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminPricing from "./pages/AdminPricing";

function Router() {
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

      {/* Shop routes */}
      <Route path={"/shop"} component={Shop} />
      <Route path={"/shop/lumber-slabs"} component={ShopLumberSlabs} />
      <Route path={"/shop/lumber-slabs/slabs"} component={() => <ShopListing category="Slabs" pageTitle="Slabs" pageDesc="Live-edge and natural-edge slabs priced from our master species board-foot table." slug="slabs" />} />
      <Route path={"/shop/lumber-slabs/mantels"} component={() => <ShopListing category="Mantels" pageTitle="Mantels" pageDesc="Character mantel beams and floating shelves cut from salvaged Texas hardwoods." slug="mantels" />} />
      <Route path={"/shop/lumber-slabs/cookies-rounds"} component={() => <ShopListing category="Cookies & Rounds" pageTitle="Cookies & Rounds" pageDesc="Cross-cut tree rounds and burl cookies — fixed-price pieces retaining their existing sale prices." slug="cookies-rounds" />} />
      <Route path={"/shop/lumber-slabs/beams"} component={() => <ShopListing category="Beams" pageTitle="Beams & Timbers" pageDesc="Structural and decorative beams milled from salvaged Texas trees." slug="beams" />} />
      <Route path={"/shop/lumber-slabs/dimensional-lumber"} component={() => <ShopListing category="Dimensional Lumber" pageTitle="Dimensional Lumber" pageDesc="Kiln-dried lumber priced by board foot." slug="dimensional-lumber" />} />
      <Route path={"/shop/slabs"} component={() => <Redirect to="/shop/lumber-slabs/slabs" />} />
      <Route path={"/shop/mantels"} component={() => <Redirect to="/shop/lumber-slabs/mantels" />} />
      <Route path={"/shop/furniture"} component={() => <Redirect to="/portfolio" />} />
      <Route path={"/shop/product/:id"} component={ProductDetail} />
      <Route path={"/cart"} component={Cart} />
      <Route path={"/checkout"} component={Checkout} />

      {/* Admin */}
      <Route path={"/admin/pricing"} component={AdminPricing} />

      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <CartProvider>
            <Router />
            <Toaster />
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
