import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { useAuth } from './lib/auth.jsx';

import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import EventDetail from './pages/EventDetail.jsx';
import Venues from './pages/Venues.jsx';
import VenueDetail from './pages/VenueDetail.jsx';
import Cities from './pages/Cities.jsx';
import Partners from './pages/Partners.jsx';
import SignIn from './pages/SignIn.jsx';
import Account from './pages/Account.jsx';
import About from './pages/About.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Contact from './pages/Contact.jsx';
import { Careers, Help, Press } from './pages/Simple.jsx';
import { Privacy, Terms } from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';

/** Restore scroll on navigation, but let in-page #anchors do their own thing. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function RequireAuth({ children }) {
  const { user, ready } = useAuth();
  const location = useLocation();

  // Wait for the stored session to be read before deciding, otherwise a signed
  // in visitor gets bounced to the sign-in page on a hard refresh.
  if (!ready) return null;

  if (!user) {
    const redirect = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/signin?redirect=${redirect}`} replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/:slug" element={<VenueDetail />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/account"
          element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
