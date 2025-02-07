import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');
export async function getOffres (){
    
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
        });
        data = data.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image_maison);
            console.log("ASIJAIS", maison)
            return maison;
        });
        return data;
    }

export async function AllMaisons (){
    let records = await pb.collection("Maison").getFullList();
    records = records.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image_maison);
            console.log("ASIJAIS", maison)
            return maison;
        });
    return records;
}

export async function oneID(id){
    const oneRecords = await pb.collection('Maison').getOne(id);
    return oneRecords;
}

export async function allMaisonsFavori(){
    const favoriRecords = await pb.collection('Maison').getFullList({filter : 'Favori = true'});
    return favoriRecords;
}

export async function allMaisonsSorted(){
    const maisonSorted = await pb.collection('Maison').getFullList({sort : 'prix',});
    return maisonSorted;
}

export async function bySurface(s){
    const maisonSurface = await pb.collection('Maison').getFullList({filter : `surface > ${s}`,
    });
    return maisonSurface;
}

export async function surfaceORprice(surface, p){
    const surfacePrice = await pb.collection('Maison').getFullList({filter : `prix < ${p} || surface > ${surface}`,
    });
    return surfacePrice;
}

export async function getOffre(id) {
    try {
        let data = await pb.collection('maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image_maison);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function bySurface(s){
    const maisonSurface = await pb.collection('Maison').getFullList({filter : `surface > ${s}`,
    });
    return maisonSurface;
}

