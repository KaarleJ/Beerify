const LandingView = () => {
  return (
    <div className="w-full h-screen flex flex-col items-stretch">
      <div className="bg-slate-300 bg-bottom bg-cover bg-[url('/beer.jpg')] h-full text-center">
        <h1 className="pt-32 pl-0">
          Meet Beerify, <br></br> the most rushed beer rating app
        </h1>
      </div>
      <div className="h-full p-12 flex flex-col items-center">
        <div className="max-w-4xl w-full p-5">
          <h2 className="px-10 pb-5">
            With beerify you can rate and review beers you have tasted
          </h2>
          <p className="text-xl">
            Beerify is the home (or at least will be) of thousands of beer
            reviews from passionate beer lovers just like you. Lost in the beer
            aisle? Don't worry! Open Beerify and discover your perfect brew!
          </p>
          <p className="text-center p-5 text-xl">
            Get started by <a href="/login">logging in</a> or{' '}
            <a href="register">registering</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingView;
