import { Button } from '@/components/ui/button';

const LandingView = () => {
  return (
    <div className="w-full h-screen flex flex-col items-stretch">
      <div className="bg-slate-300 bg-bottom bg-cover bg-[url('/beer.jpg')] h-[15rem] text-center">
        <h1 className="py-32 pl-64 text-left text-6xl">Beerify</h1>
      </div>
      <div className="flex items-center justify-between px-64 py-12 gap-12">
        <div className="flex flex-col justify-start h-full">
          <h2 className="text-2xl pb-10">
            Meet Beerify, the most rushed beer rating app
          </h2>
          <p className="text-lg max-w-2xl">
            Beerify is the home (or at least will be) of thousands of beer
            reviews from passionate beer lovers just like you. Lost in the beer
            aisle? Don't worry! Open Beerify and discover your perfect brew!
          </p>
          <p className="text-left pt-10 text-xl">
            Get started by
            <Button asChild className="text-lg mx-5">
              <a href="/login">Logging in</a>
            </Button>
            or
            <Button asChild className="text-lg mx-5">
              <a href="register">Registering</a>
            </Button>
          </p>
        </div>
        <div className="h-[20rem] w-[50rem] overflow-hidden rounded-md shadow-xl shadow-primary shado">
          <img
            src="https://images.unsplash.com/photo-1438557068880-c5f474830377?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingView;
