import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { UserContext } from '../App';
import { useParams } from 'react-router-dom';

function OtherUserProfile() {
	const [userProfile, setUserProfile] = useState();
	const { state, dispatch } = useContext(UserContext);
	const { userId } = useParams();
	const [showFollow, setShowFollow] = useState(
		state?.following ? !state.following.includes(userId) : true
	);

	useEffect(() => {
		fetch(`/user/${userId}`, {
			method: 'get',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then(function (data) {
				console.log(data);
				setUserProfile(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []); // we want to lad only once when component is mounting/loading that is why an empty array as dependency

	const follow = () => {
		fetch('/follow', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({ followId: userId }),
		})
			.then((response) => response.json())
			.then(function (updatedUser) {
				console.log(updatedUser);
				dispatch({
					type: 'UPDATE',
					payload: {
						following: updatedUser.following,
						followers: updatedUser.followers,
					},
				});
				localStorage.setItem('userInfo', JSON.stringify(updatedUser));

				setUserProfile((prevState) => {
					return {
						...prevState, //expand current state i.e. it has user and post info
						user: {
							...prevState.user,
							//update the followers count by adding the loggedin user id into the followers list of Other user
							followers: [...prevState.user.followers, updatedUser._id],
						},
					};
				});
				setShowFollow(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const unfollow = () => {
		fetch('/unfollow', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({ unfollowId: userId }),
		})
			.then((response) => response.json())
			.then(function (updatedUser) {
				console.log(updatedUser);
				dispatch({
					type: 'UPDATE',
					payload: {
						following: updatedUser.following,
						followers: updatedUser.followers,
					},
				});
				localStorage.setItem('userInfo', JSON.stringify(updatedUser));
				setUserProfile((prevState) => {
					const updatedFollowers = prevState.user.followers.filter(
						(uid) => uid != updatedUser._id
					);
					return {
						...prevState, //expand current state i.e. it has user and post info
						user: {
							...prevState.user,
							//update the followers count by removing the loggedin user id into the followers list of Other user
							followers: updatedFollowers,
						},
					};
				});
				setShowFollow(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			{userProfile ? (
				<div className='main-container'>
					<div className='profile-container'>
						<div>
							<img
								style={{
									width: '166px',
									height: '166px',
									borderRadius: '83px',
								}}
								src={userProfile.user.profilePicUrl}
							/>
						</div>
						<div className='details-section'>
							<h4>{userProfile.user.fullName}</h4>
							<h4>{userProfile.user.email}</h4>
							<div className='followings'>
								<h6>{userProfile.posts.length} Posts</h6>
								<h6>{userProfile.user.followers.length} Followers</h6>
								<h6>{userProfile.user.following.length} Following</h6>
							</div>
							{showFollow ? (
								<button
									style={{ margin: '10px' }}
									className='btn waves-effect waves-light #0d47a1 blue darken-4'
									onClick={() => follow()}>
									Follow
								</button>
							) : (
								<button
									style={{ margin: '10px' }}
									className='btn waves-effect waves-light #0d47a1 blue darken-4'
									onClick={() => unfollow()}>
									Unfollow
								</button>
							)}
						</div>
					</div>
					<div className='posts'>
						{userProfile.posts.map((post) => {
							return (
								<img
									src={post.image}
									className='post'
									alt={post.title}
									key={post._id}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<h3>Loading...</h3>
			)}
		</>
	);
}

export default OtherUserProfile;

// import React, { useEffect, useState, useContext } from 'react'
// import './Profile.css';
// import { UserContext } from '../App';
// import { useParams } from 'react-router-dom';

// function OtherUserProfile() {

//     const [userProfile, setUserProfile] = useState();
//     const { state, dispatch } = useContext(UserContext);
//     const { userId } = useParams()
//     const [showFollow, setShowFollow] = useState(state ? !state.following.includes(userId) : true);

//     useEffect(() => {
//         fetch(`/user/${userId}`, {
//             method: "get",
//             headers: {
//                 "Authorization": "Bearer " + localStorage.getItem("token")
//             }
//         })
//             .then(response => response.json())
//             .then(function (data) {
//                 console.log(data);
//                 setUserProfile(data);
//             }).catch(error => {
//                 console.log(error);
//             });
//     }, []);//we want to lad only once when component is mounting/loading thats why an empty array as dependency

//     const follow = () => {
//         fetch('/follow', {
//             method: "put",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + localStorage.getItem("token")
//             },
//             body: JSON.stringify({ followId: userId })
//         })
//             .then(response => response.json())
//             .then(function (updatedUser) {
//                 console.log(updatedUser);
//                 dispatch({ type: "UPDATE", payload: { following: updatedUser.following, followers: updatedUser.followers } })
//                 localStorage.setItem("userInfo", JSON.stringify(updatedUser))

//                 setUserProfile((prevState) => {
//                     return {
//                         ...prevState, //expand current state i.e it has user and post info
//                         user: {
//                             ...prevState.user,
//                             //update the followers count by adding the loggedin user id into the followers list of Other user
//                             followers: [...prevState.user.followers, updatedUser._id]
//                         }
//                     }
//                 })
//                 setShowFollow(false);
//             }).catch(error => {
//                 console.log(error);
//             });
//     }

//     const unfollow = () => {
//         fetch('/unfollow', {
//             method: "put",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + localStorage.getItem("token")
//             },
//             body: JSON.stringify({ unfollowId: userId })

//         })
//             .then(response => response.json())
//             .then(function (updatedUser) {
//                 console.log(updatedUser);
//                 // debugger;
//                 dispatch({ type: "UPDATE", payload: { following: updatedUser.following, followers: updatedUser.followers } })
//                 localStorage.setItem("userInfo", JSON.stringify(updatedUser))

//                 setUserProfile((prevState) => {
//                     const updatedFollowers = prevState.user.followers.filter(uid => uid != updatedUser._id)
//                     return {
//                         ...prevState, //expand current state i.e it has user and post info
//                         user: {
//                             ...prevState.user,
//                             //update the followers count by removing the loggedin user id into the followers list of Other user
//                             followers: updatedFollowers
//                         }
//                     }
//                 })
//                 setShowFollow(true);
//             }).catch(error => {
//                 console.log(error);
//             });
//     }

//     return (
//         <>
//             {
//                 userProfile
//                     ? <div className="main-container">
//                         <div className="profile-container">
//                             <div>
//                                 <img style={{ width: "166px", height: "166px", borderRadius: "83px" }}
//                                     src={userProfile.user.profilePicUrl}
//                                 />
//                             </div>
//                             <div className="details-section">
//                                 <h4>{userProfile.user.fullName}</h4>
//                                 <h5>{userProfile.user.email}</h5>
//                                 <div className="followings">
//                                     <h6>{userProfile.posts.length} posts</h6>
//                                     <h6>{userProfile.user.followers.length} followers</h6>
//                                     <h6>{userProfile.user.following.length} following</h6>
//                                 </div>
//                                 {
//                                     showFollow
//                                         ? <button style={{ margin: "10px" }} onClick={() => follow()} className="btn waves-effect waves-light #0d47a1 blue darken-4">Follow</button>
//                                         : <button style={{ margin: "10px" }} onClick={() => unfollow()} className="btn waves-effect waves-light #0d47a1 blue darken-4">UnFollow</button>
//                                 }
//                             </div>
//                         </div>
//                         <div className="posts">
//                             {
//                                 userProfile.posts.map((post) => {
//                                     return (
//                                         <img src={post.image} className="post" alt={post.title} key={post._id} />
//                                     )
//                                 })
//                             }
//                         </div>
//                     </div>
//                     : <h3>Loading...</h3>
//             }
//         </>

//     );
// };

// export default OtherUserProfile
