drop database if exists project;
create database project;
use project;


create table travel_history (
	email varchar(50),
	longitude varchar(20),
    latitude varchar(20),
    time_visited datetime
    );
    
create table reward_history (
	email varchar(50),
    item_name varchar(30),
    img_url varchar(300),
    points_used integer,
    time_redeemed datetime
	);	
    
insert into travel_history (email, longitude, latitude, time_visited)
values ("sunjun@admin.com", "1.2943669", "103.8490391", CURRENT_TIMESTAMP);
insert into travel_history (email, longitude, latitude, time_visited)
values ("sunjun@admin.com", "1.3621204", "103.9740344", CURRENT_TIMESTAMP);
insert into travel_history (email, longitude, latitude, time_visited)
values ("sunjun@admin.com", "1.2928531", "103.8486912", CURRENT_TIMESTAMP);
insert into travel_history (email, longitude, latitude, time_visited)
values ("sunjun@admin.com", "1.303486", "103.858993", CURRENT_TIMESTAMP);
insert into travel_history (email, longitude, latitude, time_visited)
values ("sunjun@admin.com", "1.2808235", "103.8474961", CURRENT_TIMESTAMP);

insert into reward_history (email, item_name, img_url, points_used, time_redeemed)
values ("sunjun@admin.com", "Lightweight Puffer Jacket", "https://lp2.hm.com/hmgoepprod?set=source[/f7/2e/f72e808f4c73dac11bf70a8535fee0e7185b09a0.jpg],origin[dam],category[men_jacketscoats_puffer],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/style]", 600, CURRENT_TIMESTAMP);
insert into reward_history (email, item_name, img_url, points_used, time_redeemed)
values ("sunjun@admin.com","Oversized Turtleneck Sweater", "https://lp2.hm.com/hmgoepprod?set=source[/e1/3c/e13cb5c6256009c7a665badcb00a35b05bf5a673.jpg],origin[dam],category[ladies_cardigansjumpers_jumpers],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/style]", 600, CURRENT_TIMESTAMP);
insert into reward_history (email, item_name, img_url, points_used, time_redeemed)
values ("sunjun@admin.com", "Oversized Turtleneck Sweater", "https://lp2.hm.com/hmgoepprod?set=source[/8d/25/8d25792868f37c212502ed5dec1e3e55100a604a.jpg],origin[dam],category[ladies_cardigansjumpers_jumpers],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/style]" , 600, CURRENT_TIMESTAMP);
insert into reward_history (email, item_name, img_url, points_used, time_redeemed)
values ("sunjun@admin.com", "Dress Pants" , "https://lp2.hm.com/hmgoepprod?set=source[/d4/8b/d48b23b92e5cc11bf2013801d6ad19f51a5ab001.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/style]",400,CURRENT_TIMESTAMP);
insert into reward_history (email, item_name, img_url, points_used, time_redeemed)
values ("sunjun@admin.com", "5-pack Cotton Pants", "https://lp2.hm.com/hmgoepprod?set=source[/5a/67/5a672be35c354f2934f6cd00b96c9c40dd7868ef.jpg],origin[dam],category[kids_newborn_bottoms],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/style]", 400,CURRENT_TIMESTAMP);
