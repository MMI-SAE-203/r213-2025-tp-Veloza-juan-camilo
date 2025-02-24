import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');




export async function getOffres (){
    
        let data = await pb.collection('Maison').getFullList(/* {
            sort: '-created',
        } */);
        data = data.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image_maison);
            return maison;
        });
        return data;
    }


export async function AllMaisons (){
    let records = await pb.collection("Maison").getFullList();
    records = records.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image_maison);
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

// Trier par surface et prix

export async function bySurface(s){
    let maisonSurface = await pb.collection('Maison').getFullList({filter : `surface > ${s}`
    });
    maisonSurface = maisonSurface.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image_maison);
            return maison;
        }); 
    return maisonSurface;
}


export async function byPrix(s){
    const maisonPrix = await pb.collection('Maison').getFullList({filter : `prix' > ${s}`,
    });
    maisonSurface = maisonSurface.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image_maison);
            return maison;
        }); 
    return maisonPrix;
}

//Formulaire

export async function addOffre(house) {
    try {
        await pb.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    console.log('prixMin', prixMin);
    console.log('prixMax', prixMax);
    try {
        let data = await pb.collection('Maison').getFullList({
            // sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.image_maison = pb.files.getURL(maison, maison.image_maison);
            return maison;
        });
        console.log('data', data);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}

//Get agents

export async function getAgent() {
    try {
        let Agent = await pb.collection('Agent').getFullList();
        Agent = Agent.map((ImgA) => {
            ImgA.imageUrl = pb.files.getURL(ImgA, ImgA.img);
            return ImgA;
        });
        return Agent;
    } catch (error) {
        console.log('Une erreur est survenue en lisant LES AGENTS', error);
        return null;
    }
    }

    export async function getAgentById(id) {
        try {
            let AgentId = await pb.collection('Agent').getOne(id);
            AgentId.imageUrl = pb.files.getURL(AgentId, AgentId.img);
            return AgentId;
        } catch (error) {
            console.log('Une erreur est survenue en lisant LES AGENTS', error);
            return null;
        }
        }

//Favori

export async function setFavori(house) {
    await pb.collection('Maison').update(house.id, {favori: !house.favori});
}