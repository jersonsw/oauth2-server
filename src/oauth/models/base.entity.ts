import {Column} from "typeorm";

export abstract class BaseEntity{

    @Column('timestamp', {name: 'created_on', nullable: false, default: ()=> 'now()'})
    createdOn: Date;

    @Column('timestamp', {name: 'last_update', nullable: true})
    lastUpdate: Date;

    @Column('timestamp', {name: 'deactivated_on', nullable: true})
    deactivatedOn: Date;

    @Column({name: 'created_from', nullable: true, length: 54, default: '0.0.0.0'})
    createdFrom: string;
}