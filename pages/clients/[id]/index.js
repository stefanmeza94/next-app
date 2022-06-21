import { useRouter } from 'next/router';

function ClientProjectPage() {
  const router = useRouter();
  console.log(router.query);

  function loadProjectHandler() {
    // ...load Data
    // ako ovde ispod koristimo replace metodu onda cemo zameniti trenutnu stranicu sa tom novom (/clients/max/projecta) sto znaci da necemo moci da se vratimo unazad
    // takodje ovde u push metodi mozemo da prosledjujemo i objekat kao sto smo radili u linku {pathname: '/clients/[id], query: {id: client.id}}
    // router.push('/clients/max/projecta');
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: { id: 'max', clientprojectid: 'projecta' },
    });
  }

  return (
    <div>
      <h1>The Project of Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectPage;
