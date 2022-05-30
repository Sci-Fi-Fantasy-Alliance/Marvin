export interface SearchQuery {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: SearchDoc[];
    num_found: number;
    q: string;
    offset: null;
}

export interface SearchDoc {
    key: string;
    type: SearchType;
    seed: string[];
    title: string;
    title_suggest: string;
    edition_count: number;
    edition_key?: string[];
    publish_date?: string[];
    publish_year?: number[];
    first_publish_year?: number;
    number_of_pages_median?: number;
    lccn?: string[];
    publish_place?: string[];
    oclc?: string[];
    contributor?: string[];
    lcc?: string[];
    ddc?: string[];
    isbn?: string[];
    last_modified_i: number;
    ia?: string[];
    ebook_count_i: number;
    has_fulltext: boolean;
    public_scan_b?: boolean;
    ia_collection_s?: string;
    lending_edition_s?: string;
    lending_identifier_s?: string;
    printdisabled_s?: string;
    cover_edition_key?: string;
    cover_i?: number;
    publisher?: string[];
    language?: string[];
    author_key?: string[];
    author_name?: string[];
    author_alternative_name?: string[];
    person?: string[];
    place?: string[];
    subject?: string[];
    time?: string[];
    id_alibris_id?: string[];
    id_amazon?: string[];
    id_canadian_national_library_archive?: string[];
    id_depósito_legal?: string[];
    id_goodreads?: string[];
    id_google?: string[];
    id_librarything?: string[];
    id_overdrive?: string[];
    id_paperback_swap?: string[];
    id_wikidata?: string[];
    ia_loaded_id?: string[];
    ia_box_id?: string[];
    publisher_facet?: string[];
    person_key?: string[];
    place_key?: string[];
    time_facet?: string[];
    person_facet?: string[];
    subject_facet?: string[];
    _version_: number;
    place_facet?: string[];
    lcc_sort?: string;
    author_facet?: string[];
    subject_key?: string[];
    ddc_sort?: string;
    time_key?: string[];
    first_sentence?: string[];
    id_amazon_ca_asin?: string[];
    id_amazon_co_uk_asin?: string[];
    id_amazon_de_asin?: string[];
    id_amazon_it_asin?: string[];
    id_bcid?: string[];
    id_british_national_bibliography?: string[];
    id_nla?: string[];
    subtitle?: string;
}

export enum SearchType {
    Work = 'work',
}
