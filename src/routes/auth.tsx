import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AuthBackgroundImage, LogoIconLight1, LogoIcon2 } from '~/assets/images';

export const Route = createFileRoute('/auth')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className="relative flex items-center justify-center min-h-screen bg-white py-4 lg:py-10">
            <div
                className="absolute inset-0 border-0 lg:border lg:border-gray-400 z-0"
                style={{
                    backgroundImage: `url(${AuthBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div className="absolute inset-0 bg-white/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white z-20" />
            <div className="absolute inset-0 bg-white/30 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 z-20" />

            <section className="relative w-full max-w-md lg:max-w-4xl lg:h-[35.625rem] bg-white rounded-none lg:rounded-lg shadow-none lg:shadow-lg overflow-hidden mx-4 z-30">
                {/* Decorative SVG - Covering the entire left panel */}
                <div className="hidden lg:block absolute left-0 top-0 w-1/2 h-full z-40 pointer-events-none">
                    {/* Light glow effect across entire left panel */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-150"></div>
                    <img
                        src={LogoIconLight1}
                        alt=""
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 drop-shadow-2xl"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/44 to-white" />

                        <div className="absolute top-64 left-36 flex items-center gap-4">
                            <img src={LogoIcon2} alt="" className="w-10 h-10" />
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-gray-800 font-nunito lowercase">
                                    Scratch
                                </span>
                            </div>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </section>
        </main>
    );
}
