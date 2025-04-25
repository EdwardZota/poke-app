import {berryDetails} from "@/app/_services/customTypes/SingleBerryInfo";
import {getBerryDetail} from "@/app/_services/berryApi";
import BerryDetail from "@/app/_components/berry/BerryDetail";

type Params = Promise<{ name: string }>

export default async function BarryPage(props: { params: Params }) {
    const params = await props.params;
    const berry: berryDetails = await getBerryDetail(params.name);

    return <BerryDetail berry={berry} />;
}
