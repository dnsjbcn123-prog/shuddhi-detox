import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-secondary py-16 text-secondary-foreground">
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div>
          <h3 className="font-heading text-2xl font-bold tracking-wider">SHUDDHI</h3>
          <p className="mt-2 font-accent text-sm italic text-secondary-foreground/60">
            Digital Balance in a Hyperconnected World
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-secondary-foreground/60">
          <Link to="/lab" className="transition-colors hover:text-primary">Balance Lab</Link>
          <Link to="/articles" className="transition-colors hover:text-primary">Articles</Link>
          <Link to="/reset" className="transition-colors hover:text-primary">Reset Space</Link>
          <Link to="/about" className="transition-colors hover:text-primary">About</Link>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="font-accent text-lg italic text-secondary-foreground/40">
          Stay Connected. Stay Centered.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
