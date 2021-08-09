import Layout from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'

export default function Custom505() {
    return (
            <>
            <h1> 500, error! </h1>
            <Link href={"/"}>
                <a>go back to project listing page</a>
            </Link>
            </>
    )
}