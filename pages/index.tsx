import Head from 'next/head';
import { useRouter } from 'next/router';
import Guard from "../components/guard/guard"

export default function Home() {
  Guard();

  return(
    <>
    </>
  );
}
