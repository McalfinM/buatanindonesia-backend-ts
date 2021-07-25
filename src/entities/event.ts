
import BaseEntity from "./baseEntity";
import { IEvent } from "./interfaces/event";
import { IEmbed } from "./interfaces/post";


class EventEntity extends BaseEntity {
    protected _uuid: string | null
    protected _title: string | null
    protected _content: string | null
    protected _category: IEmbed
    protected _created_by: IEmbed
    protected _time: string | null
    protected _place: string | null
    protected _schedule: string | null
    protected _image: string | null
    protected _slug: string | null
    protected _cloudinary_id: string
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null


    constructor(params: IEvent) {
        super();
        this._uuid = params.uuid
        this._title = params.title
        this._content = params.content
        this._category = params.category
        this._created_by = params.created_by
        this._time = params.time
        this._place = params.place
        this._schedule = params.schedule
        this._image = params.image
        this._slug = params.slug
        this._cloudinary_id = params.cloudinary_id
        this._created_at = params.created_at
        this._updated_at = params.updated_at
        this._deleted_at = params.deleted_at
    }

    get uuid(): string | null {
        return this._uuid
    }
    set uuid(uuid: string | null) {
        this._uuid = uuid
    }
    get title(): string | null {
        return this._title
    }
    set title(title: string | null) {
        this._title = title
    }
    get content(): string | null {
        return this._content
    }
    set content(content: string | null) {
        this._content = content
    }
    get time(): string | null {
        return this._time
    }
    set time(time: string | null) {
        this._time = time
    }
    get category(): IEmbed {
        return this._category
    }
    set category(category: IEmbed) {
        this._category = category
    }
    get created_by(): IEmbed {
        return this._created_by
    }
    set created_by(created_by: IEmbed) {
        this._created_by = created_by
    }
    get image(): string | null {
        return this._image
    }
    set image(image: string | null) {
        this._image = image
    }
    get slug(): string | null {
        return this._slug
    }
    set slug(slug: string | null) {
        this._slug = slug
    }
    get place(): string | null {
        return this._place
    }
    set place(place: string | null) {
        this._place = place
    }
    get schedule(): string | null {
        return this._schedule
    }
    set schedule(schedule: string | null) {
        this._schedule = schedule
    }
    get cloudinary_id(): string {
        return this._cloudinary_id
    }
    set cloudinary_id(cloudinary_id: string) {
        this._cloudinary_id = cloudinary_id
    }
    get created_at(): Date | null {
        return this._created_at
    }
    set created_at(created_at: Date | null) {
        this._created_at = created_at
    }
    get updated_at(): Date | null {
        return this._updated_at
    }
    set updated_at(updated_at: Date | null) {
        this._updated_at = updated_at
    }
    get deleted_at(): Date | null {
        return this._deleted_at
    }
    set deleted_at(deleted_at: Date | null) {
        this._deleted_at = deleted_at
    }

    toJson(): object {
        return {
            uuid: this.uuid,
            title: this.title,
            content: this.content,
            category: this.category,
            image: this.image,
            schedule: this.schedule,
            slug: this.slug,
            time: this.time,
            cloudinary_id: this.cloudinary_id,
        };
    }

    toListData(): {} {
        return {
            title: this.title,
            category: this.category,
            image: this.image,
            slug: this.slug,
            time: this.time,
            created_by: this.created_by,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }

    toListWithAuth(): {} {
        return {
            uuid: this.uuid,
            title: this.title,
            category: this.category,
            image: this.image,
            slug: this.slug,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }

    toDetailData(): {} {
        return {
            uuid: this.uuid,
            title: this.title,
            content: this.content,
            category: this.category,
            created_by: this.created_by,
            image: this.image,
            time: this.time,
            place: this.place,
            slug: this.slug,
            cloudinary_id: this.cloudinary_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}

export default EventEntity;
