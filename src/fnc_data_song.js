// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa
// 2014/6/29 Modified by nkeronkow
// 2018/11/26 Added to relick's github, changes tracked there
// github.com/relick/touhou-song-sorter

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'images/';
str_YouPath = 'https://www.youtube.com/embed/';
str_YouLink = 'https://www.youtube.com/watch?v=';

// Up to which position should images be shown for?
var int_ResultRank = 3;

// Maximum number of result rows before being broken off into another table.
var maxRows = 42;

// * Game and album titles
var ary_TitleData = [
	  "Putting Away Leftovers"
	, "Collecting Dishes"
	, "Handwashing Dishes"
	, "Putting Dishes in Dishwasher"
	, "Putting Away Dishes"
	, "Cooking Meals"
	, "Clean Counters"
	, "Clean Stove"
	, "Clean Microwave"
	, "Collecting Dirty Clothes"
	, "Putting Clothes in Washer/Dryer"
	, "Folding Laundry"
	, "Putting Clean Laundry Away"
	, "Ironing Clothes"
	, "Picking Up Trash"
	, "Taking Out Trash"
	, "Vacuuming"
	, "Mopping/Spot Cleaning Floors"
	, "Spot Cleaning (Dusting, etc.)"
	, "Unclogging Sink"
	, "Cleaning Toilet"
	, "Cleaning Shower/Bathtub"
	, "Cleaning Mirrors"
	, "Putting Away Odds 'n Ends "
];

// Number of columns in the selection list.
var int_Colspan = 3;

// * Music information
// [Index: Meaning]
// 0: unused
// 1: Track name
const TRACK_NAME = 1;
// 2: Array that maps to ary_TitleData, 0 = track not in title, 1 = track in title.
const TRACK_TITLES = 2;
// 3: Image filename
const TRACK_IMAGE = 3;
// 4: Youtube video ID
const TRACK_YOUTUBE_ID = 4;
// 5: Title (game/album) name
const TRACK_TITLE_NAME = 5;
// 6: Title (game/album) abbreviation
const TRACK_TITLE_ABBREV = 6;
// 7: Description of track
const TRACK_DESCRIPTION = 7;
// 8: If the *exact* same track appears in a later game then it should use [2] to specify rather than setting as arrangement.
const TRACK_IS_ARRANGEMENT = 8;
	const NOT_ARRANGEMENT = 0;
	const IS_ARRANGEMENT = 1;
// 9: Track type, Album tracks should all be marked as OTHER_THEME.
const TRACK_TYPE = 9;
	const STAGE_THEME = 1;
	const BOSS_THEME = 2;
	const STAGE_AND_BOSS_THEME = 3;
	const OTHER_THEME = 0;

var ary_SongData = [
	[1, "Putting Away Leftovers",						[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "IWcJtankEr4", "The Highly Responsive to Prayers", "HRtP", "Title Screen", 0, 0],
	[1, "Collecting Dishes",			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "LmN9btd7Ttg", "The Highly Responsive to Prayers", "HRtP", "Stages 1-4/Jigoku Route 16-19", 0, 2],
	[1, "Handwashing Dishes",		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "QJYAF2SZWTk", "The Highly Responsive to Prayers", "HRtP", "SinGyoku's theme", 0, 1],
	[1, "Putting Dishes in Dishwasher",		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "kFBldCY1PoQ", "The Highly Responsive to Prayers", "HRtP", "Makai Route 6-9", 0, 2],
	[1, "Putting Away Dishes",		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "-CeLvtwCMTs", "The Highly Responsive to Prayers", "HRtP", "Jigoku Route 6-9", 0, 2],
	[1, "Cooking Meals",					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "XcvTjFo2T8I", "The Highly Responsive to Prayers", "HRtP", "YuugenMagan and Mima's theme", 0, 1],
	[1, "Collecting Dirty Clothes",				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "HXZFV1aF3Dg", "The Highly Responsive to Prayers", "HRtP", "Makai Route 11-14", 0, 2],
	[1, "Putting Clothes in Washer/Dryer",				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "N4tgb2jUkvs", "The Highly Responsive to Prayers", "HRtP", "Jigoku Route 11-14", 0, 2],
	[1, "Folding Laundry",						[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "DGwLf4vyJU4", "The Highly Responsive to Prayers", "HRtP", "Elis and Kikuri's theme", 0, 1],
	[1, "Putting Clean Laundry Away",				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "ORqbz5-dzNY", "The Highly Responsive to Prayers", "HRtP", "Makai Route 16-19", 0, 2],
	[1, "Ironing Clothes",	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "YiN9rqnxw20", "The Highly Responsive to Prayers", "HRtP", "Sariel's theme", 0, 1],
	[1, "Picking Up Trash",			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "7Vtd_uyO1uY", "The Highly Responsive to Prayers", "HRtP", "Sariel's 2nd theme", 0, 1],
	[1, "Taking Out Trash",		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "2g91HjLQ4Q4", "The Highly Responsive to Prayers", "HRtP", "Konngara's theme", 0, 1],
	[1, "Vacuuming",								[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "_P8674GXz6g", "The Highly Responsive to Prayers", "HRtP", "Ending", 0, 0],
	[1, "Mopping/Spot Cleaning Floors",				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "DdCsWBMHqfU", "The Highly Responsive to Prayers", "HRtP", "Unused track", 0, 0],
	[1, "Spot Cleaning (Dusting, etc.)",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "0Ig2aUY.jpg", "qGwASZn0ZKA", "Akyuu's Untouched Score vol. 5", "AUS5", "Track 15", 0, 0],
	[1, "Unclogging Sink",	[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "fHOF0qPwEzs", "Story of Eastern Wonderland", "SoEW", "Title Screen", 0, 0],
	[1, "Cleaning Toilet",									[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "ytSxZnZ_A_8", "Story of Eastern Wonderland", "SoEW", "Stage 1", 0, 2],
	[1, "Cleaning Shower/Bathtub",										[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "jsKdEV8BHn8", "Story of Eastern Wonderland", "SoEW", "Rika's theme", 0, 1],
	[1, "Cleaning Mirrors",										[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "jsKdEV8BHn8", "Story of Eastern Wonderland", "SoEW", "Rika's theme", 0, 1],
	[1, "Putting Away Odds 'n Ends ",										[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "jsKdEV8BHn8", "Story of Eastern Wonderland", "SoEW", "Rika's theme", 0, 1],
	[1, "Clean Counters",										[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "jsKdEV8BHn8", "Story of Eastern Wonderland", "SoEW", "Rika's theme", 0, 1],
	[1, "Clean Stove",										[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "jsKdEV8BHn8", "Story of Eastern Wonderland", "SoEW", "Rika's theme", 0, 1],
	[1, "Clean Microwave",										[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "jsKdEV8BHn8", "Story of Eastern Wonderland", "SoEW", "Rika's theme", 0, 1],
];
//,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "sjw6_Z6BG6A", "Urban Legend in Limbo", "ULiL", "Pre-Battle", 0, 0],
//	[1, "Battlefield of Hanahazama",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "fp8hxDtqmR0", "Urban Legend in Limbo", "ULiL", "Kasen Ibaraki's theme/Penultimate Boss", 0, 3],
//	[1, "Outside World Folklore",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "MUYyv0tYrSE", "Urban Legend in Limbo", "ULiL", "Pre-Boss", 0, 0],
//	[1, "Last Occultism ~ Esotericist of the Present World",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "m2DrKruxJUw", "Urban Legend in Limbo", "ULiL", "Sumireko Usami's theme/Final Boss", 0, 3],
//	[1, "Each Ending",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "zEYTIjJkyZM", "Urban Legend in Limbo", "ULiL", "Ending",
