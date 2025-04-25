import {itemDetails} from "@/app/_services/customTypes/SingleItemInfo";
import {getItemDetail} from "@/app/_services/ItemApi";
import ItemDetail from "@/app/_components/item/ItemDetail";

type Params = Promise<{ name: string }>

export default async function BarryPage(props: { params: Params }) {
    const params = await props.params;
    const item: itemDetails = await getItemDetail(params.name);

    return <ItemDetail item={item} />;
}
