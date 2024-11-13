import {
	query,
	where,
	limit,
	or,
	orderBy,
	collection,
} from 'firebase/firestore';
import db from '../firebase/init.js';

const zipsCollection = collection(db, 'zips');

export const zipsQueries = [
	{
		id: 1,
		title: 'Cities with population > 10000',
		query: query(zipsCollection, where('pop', '>', 10000)),
	},
	{
		id: 2,
		title: 'Cities in New York',
		query: query(zipsCollection, where('state', '==', 'NY'), limit(10)),
	},
	{
		id: 3,
		title: 'Cities in DC with population > 10000',
		query: query(
			zipsCollection,
			where('state', '==', 'DC'),
			where('pop', '>', 10000),
		),
	},
	{
		id: 4,
		title: 'Number of cities in DC',
		query: query(zipsCollection, where('state', '==', 'DC')),
		aggregate: 'count',
	},
	{
		id: 5,
		title: 'Cities in DC or with population > 100000',
		query: query(
			zipsCollection,
			or(where('state', '==', 'DC'), where('pop', '>', 100000)),
		),
	},
	{
		id: 6,
		title: 'Cities in DC sorted by population',
		query: query(
			zipsCollection,
			where('state', '==', 'DC'),
			orderBy('pop', 'asc'),
		),
	},
	{
		id: 7,
		title: 'Cities in DC and total population',
		query: query(zipsCollection, where('state', '==', 'DC')),
		aggregate: 'sum.pop',
	},
];
