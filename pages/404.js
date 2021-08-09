import Layout from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
    return (
            <>
            <h1> 404, page not found! </h1>
            <Link href={"/"}>
                <a>go back to project listing page</a>
            </Link>
            </>
    )
}