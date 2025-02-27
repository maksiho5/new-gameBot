'use client';

import './page.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Harek from '@/src/HarekHome/HarekHome';

export default function Home() {
    const [userId, setUserId] = useState(0);
    const [TelegramWebApp, setTelegramWebApp] = useState(null); // Состояние для TelegramWebApp

    useEffect(() => {
        // Динамический импорт библиотеки
        import('@twa-dev/sdk')
            .then((module) => {
                const TWA = module.default;
                setTelegramWebApp(TWA); // Сохраняем TWA в состоянии
                TWA.ready();
                TWA.expand();
            })
            .catch((error) => {
                console.error('Failed to load TelegramWebApp:', error);
            });
    }, []);

    useEffect(() => {
        if (TelegramWebApp) {
            const user = TelegramWebApp.initDataUnsafe?.user;

            console.log(user);
            if (user) {
                setUserId(user.id);
            }
        }
    }, [TelegramWebApp]); // Зависимость от TelegramWebApp

    return (
        <div className="backround">
            <Harek />
        </div>
    );
}