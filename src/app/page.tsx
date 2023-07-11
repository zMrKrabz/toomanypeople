"use client"

import Image from 'next/image'
import './globals.css'
import Home from '@/pages/home'
import InfoModal from '@/components/infoModal'

export default function App() {
  return (
    <main className="flex flex-col items-center justify-between p-10 font-[FavoritSSENSE-Inter] text-base w-full space-y-2">
			<title>toomanypeople</title>
			<div className="flex flex-row justify-between items-center w-full">
				<div className="justify-center">
					<p>toomanypeople</p>
				</div>
				<div className="justify-end">
					<InfoModal />
				</div>
			</div>
			<Home />

			{/* footer */}
			<div className="flex flex-row text-slate-500 text-sm justify-between w-full">
				<a href="https://github.com/zMrKrabz/toomanypeople">View this project on Github</a>
				<p>Made by Hardy An</p>
			</div>
		</main>
  )
}
