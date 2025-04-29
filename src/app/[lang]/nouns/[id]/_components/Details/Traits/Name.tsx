import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import { ImageData } from '@noundry/nouns-assets';
import Link from 'next/link';

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
    if (auction) {
        if (type === NounTraitLayer.Accessory) {
            return (
                <Link
                    href={`/nouns?accessory=${
                        ImageData.images.accessories[
                            Number(auction.noun.seed.accessory)
                        ]?.filename
                    }`}
                    className="text-link"
                >
                    <span
                        data-auction-trait-id={auction.noun.seed.accessory}
                        data-auction-trait-name={
                            ImageData.images.accessories[
                                Number(auction.noun.seed.accessory)
                            ]?.filename
                        }
                    >
                        {dict.traits[
                            ImageData.images.accessories[
                                Number(auction.noun.seed.accessory)
                            ]?.filename
                        ] || auction.noun.seed.accessory}
                    </span>
                </Link>
            );
        }

        if (type === NounTraitLayer.Background) {
            return (
                <Link
                    href={`/nouns?background=${
                        auction.noun.seed.background == 0 ? 'd5d7e1' : 'e1d7d5'
                    }`}
                    className="text-link"
                >
                    <span data-auction-trait-id={auction.noun.seed.background}>
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
                </Link>
            );
        }

        if (type === NounTraitLayer.Body) {
            return (
                <Link
                    href={`/nouns?body=${
                        ImageData.images.bodies[Number(auction.noun.seed.body)]
                            ?.filename
                    }`}
                    className="text-link"
                >
                    <span
                        data-auction-trait-id={auction.noun.seed.body}
                        data-auction-trait-name={
                            ImageData.images.bodies[
                                Number(auction.noun.seed.body)
                            ]?.filename
                        }
                    >
                        {dict.traits[
                            ImageData.images.bodies[
                                Number(auction.noun.seed.body)
                            ]?.filename
                        ] || auction.noun.seed.body}
                    </span>
                </Link>
            );
        }

        if (type === NounTraitLayer.Glasses) {
            return (
                <Link
                    href={`/nouns?glasses=${
                        ImageData.images.glasses[
                            Number(auction.noun.seed.glasses)
                        ]?.filename
                    }`}
                    className="text-link"
                >
                    <span
                        data-auction-trait-id={auction.noun.seed.glasses}
                        data-auction-trait-name={
                            ImageData.images.glasses[
                                Number(auction.noun.seed.glasses)
                            ]?.filename
                        }
                    >
                        {dict.traits[
                            ImageData.images.glasses[
                                Number(auction.noun.seed.glasses)
                            ]?.filename
                        ] || auction.noun.seed.glasses}
                    </span>
                </Link>
            );
        }

        if (type === NounTraitLayer.Head) {
            return (
                <Link
                    href={`/nouns?head=${
                        ImageData.images.heads[Number(auction.noun.seed.head)]
                            ?.filename
                    }`}
                    className="text-link"
                >
                    <span
                        data-auction-trait-id={auction.noun.seed.head}
                        data-auction-trait-name={
                            ImageData.images.heads[
                                Number(auction.noun.seed.head)
                            ]?.filename
                        }
                    >
                        {dict.traits[
                            ImageData.images.heads[
                                Number(auction.noun.seed.head)
                            ]?.filename
                        ] || auction.noun.seed.head}
                    </span>
                </Link>
            );
        }
    }

    if (noun) {
        if (type === NounTraitLayer.Accessory) {
            return (
                <Link
                    href={`/nouns?accessory=${noun.accessory_name}`}
                    className="text-link"
                >
                    <span data-db-trait-name={noun.accessory_name}>
                        {dict.traits[noun.accessory_name] ||
                            noun.accessory_name}
                    </span>
                </Link>
            );
        }

        if (type === NounTraitLayer.Background) {
            return (
                <Link
                    href={`/nouns?background=${
                        noun.background_index == 0 ? 'd5d7e1' : 'e1d7d5'
                    }`}
                    className="text-link"
                >
                    <span data-db-trait-id={noun.background_index}>
                        {
                            dict.traits[
                                `background-${
                                    noun.background_index == 0 ? 'cool' : 'warm'
                                }`
                            ]
                        }
                    </span>
                </Link>
            );
        }

        if (type === NounTraitLayer.Body) {
            return (
                <Link
                    href={`/nouns?body=${noun.body_name}`}
                    className="text-link"
                >
                    <span data-db-trait-name={noun.body_name}>
                        {dict.traits[noun.body_name] || noun.body_name}
                    </span>
                </Link>
            );
        }

        if (type === NounTraitLayer.Glasses) {
            return (
                <Link
                    href={`/nouns?glasses=${noun.glasses_name}`}
                    className="text-link"
                >
                    <span data-db-trait-name={noun.glasses_name}>
                        {dict.traits[noun.glasses_name] || noun.glasses_name}
                    </span>
                </Link>
            );
        }

        if (type === NounTraitLayer.Head) {
            return (
                <Link
                    href={`/nouns?head=${noun.head_name}`}
                    className="text-link"
                >
                    <span data-db-trait-name={noun.head_name}>
                        {dict.traits[noun.head_name] || noun.head_name}
                    </span>
                </Link>
            );
        }
    }

    return null;
}
