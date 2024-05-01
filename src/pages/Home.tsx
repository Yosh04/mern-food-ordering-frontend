import landingImage from '../assets/landing.png'
import appDownloadImage from '../assets/appDownload.png'


function Home() {
  return (
    <div className='flex flex-col gap-12 '>
        <div className='bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'>
            <h1 className='text-5xl font-bold tracking-tight text-orange-500'>
                Tuck into a takeway today.
            </h1>
            <span className='text-xl'> Food just a click</span>
        </div>
        <div className='grid md:grid-cols-2 gap-5'>
            <img src={landingImage} alt='landing image' />
            <div className='flex flex-col items-center justify-center gap-4 text-center'>
                <span className='font-bold text-3xl tracking-tight'> Order takeway even faster</span>
                <span>Download the MernEats if you want eat without cook.</span>
                <img src={appDownloadImage} alt="app download" />
            </div>
        </div>
    </div>
  )
}

export default Home