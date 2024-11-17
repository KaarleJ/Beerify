import { Button } from '@/components/ui/button';

const LandingView = () => {
  return (
    <div className="w-full h-screen flex flex-col items-stretch">
      <div className="bg-slate-300 bg-bottom bg-cover bg-[url('/beer.jpg')] h-[10rem] md:h-[15rem] text-center">
        <h1 className="md:py-32 md:pl-56 px-6 text-left text-4xl md:text-6xl">
          Beerify
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 md:px-56 md:py-12 md:gap-12">
        <div className="flex flex-col justify-start h-full">
          <h2 className="text-2xl pb-10">
            Meet Beerify, the most rushed beer rating app
          </h2>
          <p className="text-lg max-w-2xl">
            Beerify is the home (or at least will be) of thousands of beer
            reviews from passionate beer lovers just like you. Lost in the beer
            aisle? Don't worry! Open Beerify and discover your perfect brew!
          </p>
          <Button asChild className="text-lg w-[8rem] mt-10">
            <a href="/register">Get started</a>
          </Button>
        </div>
        <div className="md:h-[20rem] md:w-[50rem] overflow-hidden rounded-md md:shadow-xl md:shadow-primary">
          <img
            src="https://images.unsplash.com/photo-1438557068880-c5f474830377?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="object-cover object-center hidden md:flex"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingView;
