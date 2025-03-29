import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import { ImageData } from '@noundry/nouns-assets';

interface Props {
    auction?: AuctionFromSubgraph;
    dict: Dictionary;
    noun?: NounFromDB;
    type: NounTraitLayer;
}

export default function DetailsTraitsName({
    auction,
    dict,
    noun,
    type,
}: Props) {
    if (noun) {
        if (type === NounTraitLayer.Accessory) {
            return <span>{dict.traits[noun.accessory_name]}</span>;
        }

        if (type === NounTraitLayer.Background) {
            return (
                <span>
                    {
                        dict.traits[
                            `background-${
                                noun.background_index == 0 ? 'cool' : 'warm'
                            }`
                        ]
                    }
                </span>
            );
        }

        if (type === NounTraitLayer.Body) {
            return <span>{dict.traits[noun.body_name]}</span>;
        }

        if (type === NounTraitLayer.Glasses) {
            return <span>{dict.traits[noun.glasses_name]}</span>;
        }

        if (type === NounTraitLayer.Head) {
            return <span>{dict.traits[noun.head_name]}</span>;
        }
    }

    if (auction) {
        if (type === NounTraitLayer.Accessory) {
            return (
                <span>
                    {
                        dict.traits[
                            ImageData.images.accessories[
                                Number(auction.noun.seed.accessory)
                            ].filename
                        ]
                    }
                </span>
            );
        }

        if (type === NounTraitLayer.Background) {
            return (
                <span>
                    {
                        dict.traits[
                            `background-${
                                auction.noun.seed.background == 0
                                    ? 'cool'
                                    : 'warm'
                            }`
                        ]
                    }
                </span>
            );
        }

        if (type === NounTraitLayer.Body) {
            return (
                <span>
                    {
                        dict.traits[
                            ImageData.images.bodies[
                                Number(auction.noun.seed.body)
                            ].filename
                        ]
                    }
                </span>
            );
        }

        if (type === NounTraitLayer.Glasses) {
            return (
                <span>
                    {
                        dict.traits[
                            ImageData.images.glasses[
                                Number(auction.noun.seed.glasses)
                            ].filename
                        ]
                    }
                </span>
            );
        }

        if (type === NounTraitLayer.Head) {
            return (
                <span>
                    {
                        dict.traits[
                            ImageData.images.heads[
                                Number(auction.noun.seed.head)
                            ].filename
                        ]
                    }
                </span>
            );
        }
    }

    return null;
}
