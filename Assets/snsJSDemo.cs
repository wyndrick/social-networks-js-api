using UnityEngine;
using System.Collections.Generic;
using UnityEngine.UI;
using Assets;
using System.Collections;

public class snsJSDemo : MonoBehaviour
{

    public Button btnGetData;
    public Image avatar;
    public Text tf_first_name;
    public Text tf_last_name;

    public Button btnGetData2;
    public Image avatar2;
    public Text tf_first_name2;
    public Text tf_last_name2;

    public Button btnGetData3;

    public User appUser;
 
    // Use this for initialization
    void Start()
    {
        btnGetData = transform.Find("btnGetData").GetComponent<Button>();
        avatar = transform.Find("Avatar").GetComponent<Image>();
        tf_first_name = transform.Find("tf_first_name").GetComponent<Text>();
        tf_last_name = transform.Find("tf_last_name").GetComponent<Text>();
        btnGetData.onClick.AddListener(GetUserInfo);

        btnGetData2 = transform.Find("btnGetData2").GetComponent<Button>();
        avatar2 = transform.Find("Avatar2").GetComponent<Image>();
        tf_first_name2 = transform.Find("tf_first_name2").GetComponent<Text>();
        tf_last_name2 = transform.Find("tf_last_name2").GetComponent<Text>();
        btnGetData2.onClick.AddListener(GetME);

        btnGetData3 = transform.Find("btnGetData3").GetComponent<Button>();
        btnGetData3.onClick.AddListener(GetFriendsSids);


        appUser = new User();
    }



    public void GetUserInfo()
    {
        Application.ExternalCall("getUserInfo");
    }

    public void GetUserInfoCallback(string data)
    {
        var user = JSON.JSONObject.Create(data);

        appUser.UserID = user.GetField("uid").str;
        appUser.FirstName = user.GetField("FirstName").str;
        appUser.LastName = user.GetField("LastName").str;        
        appUser.Photo = user.GetField("Photo").str;
        
        tf_first_name.text = appUser.FirstName;
        tf_last_name.text = appUser.LastName;

        StartCoroutine(Loadfromweb(appUser.Photo, avatar));

    }

    IEnumerator Loadfromweb(string url, Image img)
    {
        Application.ExternalCall("LOG", url);

        WWW www = new WWW(url);      
        yield return www;
        Application.ExternalCall("LOG", www.error);
        img.sprite = Sprite.Create(www.texture, new Rect(0, 0, www.texture.width, www.texture.height), new Vector2(0, 0), avatar.sprite.pixelsPerUnit);
    }

    private void GetME()
    {
        GetUsersInfo(appUser.UserID);
    }

    public void GetUsersInfo(string uids)
    {
        var respondID = 1;
        Application.ExternalCall("getUsersInfo", uids, respondID);
    }

    public void GetUsersInfoCallback(string data)
    {
        var user = JSON.JSONObject.Create(data);
        int resondID = (int)user[user.Count - 1].n;
        for (var i = 0; i < user.Count - 1; i++)
        {
            tf_first_name2.text = user[i].GetField("FirstName").str;
            tf_last_name2.text = user[i].GetField("LastName").str;

            StartCoroutine(Loadfromweb(user[i].GetField("Photo").str, avatar2));
        }
    }

    public void GetFriendsSids()
    {
        Application.ExternalCall("getFriendsSids");
    }

    public void GetFriendsSidsCallback(string data)
    {
        var user = JSON.JSONObject.Create(data);
        Text sids = transform.Find("tf_friend_sids").GetComponent<Text>();
        sids.text = "";

        for (var i = 0; i < user.Count; i++)
        {
            sids.text += user[i].ToString();
        }

        if (sids.text == "")
        {
            sids.text = "No friends found";
        }
    }

    public void NavigateToProfile()
    {
        Application.ExternalCall("navigateToProfile", appUser.UserID);
    }


}
