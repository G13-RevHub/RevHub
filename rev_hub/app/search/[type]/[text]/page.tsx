"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import React from 'react';

function createList(tag: string, results: any[]) {
    if (!results) {
        return <div>Error while searching, please retry again</div>;
    } else if (results.length === 0) {
        return <div>Nothing found</div>
    } else if (tag === "review" || tag === "tag") {
        return (
            <div className="flex flex-col space-y-2">
                {
                    results.map((result, id) => (
                        <Link key={id} href={`/review/${result.id}`}>{decodeURIComponent(result.title)}</Link>
                    ))
                }
            </div>
        )
    } else if (tag === "user") {
        return (
            <div className="flex flex-col space-y-2">
                {
                    results.map((result, id) => (
                        <Link key={id} href={`/profile/${result.id}`}>@{decodeURIComponent(result.username)}</Link>
                    ))
                }
            </div>
        )
    }
}

export default function SearchReview({ params }: { params: { type: string, text: string } }) {
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const txt = params.text.replaceAll('@', '').replaceAll('#', '').replaceAll("%20", " ").replaceAll("%22", '"')

    useEffect(() => {
        if (txt.length === 0) return

        console.log(`searching ${txt} using ${params.type}`)

        axios.get(`/api/search/${params.type}/${txt}`).then( res => {
            setResults(res.data.results)
            setLoading(false)
        }).catch(error => {
            alert("Error while searching: " + error.message)
            setLoading(false)
        })
    }, [])


    if (loading)
        return (
            <main className="flex flex-col items-center p-8">
                <h1>RevHub</h1>
                <h2>Caricamento...</h2>
                <h4>In caso di lentezza, la preghiamo di ricaricare</h4>
            </main>
        )
    else
        return (
            <main className="flex flex-col p-8 w-full">
                <h1 className="text-[25px] font-bold">Search {params.type === "user" ? <>User</> : <>Review</>} for &quot;{decodeURIComponent(params.text)}&quot;</h1>
                <div className="flex space-x-2">
                    {
                        createList(params.type, results)
                    }
                </div>
            </main>
        )
}
