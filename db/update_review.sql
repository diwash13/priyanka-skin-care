update reviews
set review = $2
where id = $1;

select reviews.id, reviews.user_id, reviews.review, users.username
from reviews
join users 
on reviews.user_id = users.id
order by reviews.id asc;