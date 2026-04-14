import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [addressText, setAddressText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [terminalStatus, setTerminalStatus] = useState('ОЖИДАНИЕ_ВВОДА');

    const assets = [
        { 
            id: 'usdt', 
            name: 'USDT (TRC20)', 
            icon: 'account_balance_wallet', 
            address: 'T9zBqxYSVovzY4j73MTRtYn9pZNo2D8T8K',
            qr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=T9zBqxYSVovzY4j73MTRtYn9pZNo2D8T8K&color=00ff41&bgcolor=0a0c10'
        },
        { 
            id: 'btc', 
            name: 'BTC', 
            icon: 'currency_bitcoin', 
            address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
            qr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh&color=00ff41&bgcolor=0a0c10'
        },
        { 
            id: 'eth', 
            name: 'ETH (ERC20)', 
            icon: 'token', 
            address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            qr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x71C7656EC7ab88b098defB751B7401B5f6d8976F&color=00ff41&bgcolor=0a0c10'
        },
        { 
            id: 'da', 
            name: 'DonationAlerts', 
            icon: 'favorite', 
            address: 'DONATIONALERTS_ID_12345',
            qr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DonationAlerts_ID&color=00ff41&bgcolor=0a0c10'
        },
        { 
            id: 'dp', 
            name: 'DonatePay', 
            icon: 'payments', 
            address: 'DONATEPAY_ID_67890',
            qr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DonatePay_ID&color=00ff41&bgcolor=0a0c10'
        }
    ];

    const handleAssetSelect = (asset) => {
        setSelectedAsset(asset);
        setAddressText('');
        setIsTyping(true);
        setTerminalStatus('ПЕРЕДАЧА_ДАННЫХ');

        let i = 0;
        const interval = setInterval(() => {
            if (i < asset.address.length) {
                setAddressText(prev => prev + asset.address.charAt(i));
                i++;
            } else {
                clearInterval(interval);
                setIsTyping(false);
                setTerminalStatus('ДАННЫЕ_ГОТОВЫ');
            }
        }, 20);
    };

    const copyToClipboard = () => {
        if (!selectedAsset) return;
        navigator.clipboard.writeText(selectedAsset.address);
        alert('Адрес скопирован!');
    };

    return (
        <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden flicker min-h-screen">
            <div className="scanline"></div>

            {/* TopAppBar */}
            <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-6 py-4 bg-surface-container-lowest/80 backdrop-blur-md border-b border-primary-container/10 font-headline tracking-tight uppercase">
                <div className="text-lg md:text-xl font-bold tracking-tighter text-primary-container hover:brightness-125 cursor-pointer">KINETIC_COMMAND</div>
                <nav className="hidden md:flex space-x-6 lg:space-x-8">
                    {['ПРОИЗВОДСТВО', 'КАНАЛЫ', 'ДЕПОЗИТЫ'].map(item => (
                        <a key={item} className="text-primary-container/40 hover:text-primary-container transition-all relative group" href="#">
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary-container group-hover:w-full transition-all duration-300"></span>
                        </a>
                    ))}
                </nav>
                <div className="flex items-center space-x-3 md:space-x-4">
                    <span className="material-symbols-outlined text-primary-container cursor-pointer hover:bg-primary-container/10 p-1 transition-colors">terminal</span>
                    <span className="material-symbols-outlined text-primary-container cursor-pointer hover:bg-primary-container/10 p-1 transition-colors">settings_input_component</span>
                    <div className="w-8 h-8 border border-primary-container/30 flex items-center justify-center bg-surface-container overflow-hidden group">
                        <img alt="Avatar" className="w-full h-full object-cover grayscale brightness-110 contrast-125 group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ7k1X0yvMvyEQBJJKqQTwk__9txjbypqJOs2Sjl0i67cmtl9MCLoG0hr-AIkwZzULPPayGKJOyweEZvqx8ZpfSdwK3hNvnFEjbnbPLgSoCLpbW-EVTGJF7kxaeyRgPeKgDqinStpuWh5Nv986qXGv_PXYh_qVnCxK6wJfTQiDJHs9-RJWy0_LHMkuvNAvqCXfFF-ATzG3KKfIOh6__f1RGs5VZt8oQ2bvk-2a-rYavApQTzzh1QMODtyyzj2_bPfHHVxpBrCF2sI"/>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
                {/* Profile Header */}
                <section className="mb-12 relative flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 p-6 md:p-10 border border-outline-variant bg-surface-container-low layer-line-texture card-depth">
                    <div className="relative w-40 h-40 md:w-48 md:h-48 border-2 border-primary-container p-2 shadow-[0_0_20px_rgba(0,255,65,0.2)]">
                        <img alt="Profile" className="w-full h-full object-cover filter contrast-150 saturate-0 hue-rotate-90 hover:saturate-50 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX43na7M69Txqm89IV901tRVPf6hB54K_ov1N95gEkz0R-QW6wktYhOTfqX7qNI6kypf5U1Bujk0XVCqK4ugKmcigd4iSul-4KuBqlriwVf8WAOX10nvhfQHKCere04vId0zfumfxweYtZFVfeuNRqLIgKTtaTMS5NFpVxYsF7tfU5OdKboqiv_C40-lFL4CeMs5tnzQYBktUZBgtGReOiRE2kEr9CSrrVe4-kg-SAn4xf15p0d8EFFkGo4_v7oA6LGREyQDQ1U6E"/>
                        <div className="absolute -bottom-2 -right-2 bg-primary-container text-on-primary-container text-[10px] px-2 py-1 font-mono font-bold animate-pulse">АКТИВНАЯ_ПЕЧАТЬ</div>
                    </div>
                    <div className="flex-1 space-y-4 text-center md:text-left overflow-hidden w-full">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-headline font-black tracking-tighter text-primary-container typing truncate">ОПЕРАТОР_УЗЛА</h1>
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <p className="font-mono text-xs md:text-sm tracking-widest text-on-surface-variant bg-surface-container-highest/50 px-3 py-1 border-l-2 border-primary-container shadow-lg">
                                ОЖИДАЕМОЕ_ВРЕМЯ_ПЕЧАТИ: <span className="text-primary-fixed">14Ч 22М</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Social Grid */}
                <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
                    <SocialCard icon="videocam" title="TWITCH" span="col-span-2" />
                    <SocialCard icon="video_library" title="TIKTOK" />
                    <SocialCard icon="photo_camera" title="INSTAGRAM" />
                    <SocialCard icon="subscriptions" title="YOUTUBE" span="col-span-2 md:col-span-1 lg:col-span-2" subtitle="АРХИВ_СТРИМОВ" />
                    <a className="col-span-2 md:col-span-1 lg:col-span-6 group flex items-center justify-between border border-primary-container/30 bg-primary-container/5 px-4 md:px-6 py-5 hover:bg-primary-container/10 transition-all card-depth overflow-hidden" href="#">
                        <div className="flex items-center gap-4 relative overflow-hidden">
                            <span className="material-symbols-outlined text-2xl text-primary-container group-hover:translate-x-1 transition-transform">send</span>
                            <h3 className="font-mono text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.4em] text-primary-container glitch truncate">ВСТУПИТЬ_В_ТЕЛЕГРАМ_КЛАСТЕР</h3>
                        </div>
                    </a>
                </section>

                {/* Donation Terminal */}
                <section className="border border-outline-variant bg-surface-container-lowest p-1 shadow-2xl">
                    <div className="bg-surface-container-low p-4 md:p-8 border border-outline-variant/50">
                        <h2 className="font-headline text-xl md:text-2xl font-bold tracking-tight text-primary-container uppercase glitch mb-8">ВНЕШНЕЕ_ФИНАНСИРОВАНИЕ</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                            {assets.slice(0, 3).map(asset => (
                                <AssetButton key={asset.id} asset={asset} active={selectedAsset?.id === asset.id} onClick={() => handleAssetSelect(asset)} />
                            ))}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                {assets.slice(3).map(asset => (
                                    <AssetButton key={asset.id} asset={asset} active={selectedAsset?.id === asset.id} onClick={() => handleAssetSelect(asset)} />
                                ))}
                            </div>
                        </div>

                        <div className="bg-black/40 border border-outline-variant/30 p-4 md:p-6 font-mono relative overflow-hidden min-h-[140px] flex flex-col justify-center">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] text-on-surface-variant/50 mb-6 pb-2 border-b border-outline-variant/10">
                                <span>ВЫВОД_ТЕРМИНАЛА // ЗАПРОС_АДРЕСА</span>
                                <span className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <span className={`w-1.5 h-1.5 rounded-full ${terminalStatus !== 'ОЖИДАНИЕ_ВВОДА' ? 'bg-primary-container animate-pulse' : 'bg-on-surface-variant/30'}`}></span>
                                    [ СТАТУС: {terminalStatus} ]
                                </span>
                            </div>

                            {!selectedAsset ? (
                                <div className="flex items-center justify-center py-4">
                                    <p className="text-primary-container/40 text-[10px] md:text-xs tracking-widest animate-pulse">ВЫБЕРИТЕ АКТИВ ДЛЯ ЗАПРОСА АДРЕСА...<span className="terminal-cursor"></span></p>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                                    <div className="flex-1 space-y-4 w-full">
                                        <div className="text-primary-container text-xs md:text-sm break-all font-bold tracking-wider bg-primary-container/5 p-3 border-l-2 border-primary-container">
                                            {addressText}
                                        </div>
                                        <button onClick={copyToClipboard} className="relative flex items-center justify-center gap-3 bg-primary-container text-on-primary-container px-6 py-3 hover:brightness-110 active:scale-95 transition-all font-bold text-xs shadow-[0_0_15px_rgba(0,255,65,0.3)] w-full md:w-auto">
                                            <span className="material-symbols-outlined text-sm">content_copy</span>
                                            <span>КОПИРОВАТЬ_АДРЕС</span>
                                        </button>
                                    </div>
                                    <div className="relative border border-primary-container/30 bg-black p-2 w-28 h-28 md:w-32 md:h-32 flex items-center justify-center overflow-hidden">
                                        <img alt="QR" className="w-full h-full grayscale brightness-125 contrast-125 hover:grayscale-0 transition-all duration-700" src={selectedAsset.qr}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* Sidebar Navigator */}
            <aside className="hidden md:flex fixed left-0 top-0 h-full z-40 flex flex-col bg-surface-container-lowest border-r border-outline-variant/10 w-16 hover:w-64 transition-all duration-500 group font-mono text-xs uppercase tracking-widest overflow-hidden">
                <div className="p-4 flex items-center space-x-3 mb-8">
                    <span className="material-symbols-outlined text-primary-container animate-pulse">precision_manufacturing</span>
                    <div className="hidden group-hover:block whitespace-nowrap">
                        <div className="text-lg font-black text-primary-container glitch">УЗЕЛ_01</div>
                    </div>
                </div>
                <nav className="flex-1 space-y-2">
                    {['videocam', 'video_library', 'photo_camera'].map(icon => (
                        <a key={icon} className="flex items-center space-x-4 text-primary-container/40 px-4 py-4 hover:bg-surface-container-high hover:text-primary-container transition-all" href="#">
                            <span className="material-symbols-outlined">{icon}</span>
                        </a>
                    ))}
                </nav>
            </aside>

            {/* Footer */}
            <footer className="fixed bottom-0 w-full z-50 px-4 md:px-8 py-3 flex justify-between items-center bg-surface-container-lowest/90 backdrop-blur-sm border-t border-primary-container/10 font-mono text-[10px] tracking-widest uppercase">
                <div className="text-on-surface-variant/30 truncate">© 2024 KINETIC_COMMAND // ОПЕРАТОР_УЗЛА</div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_12px_#00FF41] animate-pulse"></div>
                    <span className="text-primary-container font-bold">СИСТЕМА_ОНЛАЙН</span>
                </div>
            </footer>
        </div>
    );
};

const SocialCard = ({ icon, title, span = '', subtitle }) => (
    <a className={`${span} group relative border border-outline-variant bg-surface-container overflow-hidden p-6 hover:bg-surface-container-high transition-all card-depth`} href="#">
        <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-2xl md:text-3xl text-primary-container group-hover:scale-110 transition-transform">{icon}</span>
        </div>
        <h3 className="font-mono text-sm md:text-lg font-bold tracking-widest text-primary-container glitch">{title}</h3>
        {subtitle && <p className="font-mono text-[10px] text-on-surface-variant/40">{subtitle}</p>}
        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-container group-hover:w-full transition-all duration-500"></div>
    </a>
);

const AssetButton = ({ asset, active, onClick }) => (
    <button onClick={onClick} className={`group flex items-center justify-between px-4 md:px-6 py-4 border border-outline/30 text-on-surface-variant font-mono text-sm hover:bg-surface-container-high transition-all text-left card-depth ${active ? 'bg-primary-container/10 border-primary-container text-primary-container shadow-[0_0_15px_rgba(0,255,65,0.2)]' : ''}`}>
        <div className="flex items-center gap-3">
            <span className={`material-symbols-outlined text-lg transition-colors ${active ? 'text-primary-container' : 'text-primary-container/60 group-hover:text-primary-container'}`}>{asset.icon}</span>
            <span className="glitch truncate">{asset.name}</span>
        </div>
        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
    </button>
);

export default App;
