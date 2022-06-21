import { useRouter } from 'next/router';

function PortofolioProjectPage() {
  const router = useRouter();
  // console.log(router);
  // console.log(router.pathname);
  console.log(router.query.projectid);
  return (
    <div>
      <h1>The Portofolio Project Page</h1>
    </div>
  );
}

export default PortofolioProjectPage;
