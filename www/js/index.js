/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
MIT License

Copyright (c) 2019 Tabwire

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
*/

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        var nameURL = 'https://apextab.com/api/search.php?platform=';
        var idURL = 'https://apextab.com/api/player.php?aid=';
        var xhrA = new XMLHttpRequest();
        var xhrB = new XMLHttpRequest();
        var platform = 'pc';
        var btnPC = document.getElementById('btnPC');
        var btnPS4 = document.getElementById('btnPS4');
        var btnXBOX = document.getElementById('btnXBOX');
        var btnSearch = document.getElementById('btnSearch');
        var homeDisplay = document.getElementById('homeDisplay');

        //elements used for displaying player statistics
        var playerDisplay = document.getElementById('playerDisplay');
        var playerInfo = document.getElementById('playerInfo');
        var playerAvatar = document.getElementById('playerAvatar');
        var playerLegend = document.getElementById("playerLegend");
        var playerLevel = document.getElementById('playerLevel');
        var playerMatches = document.getElementById("playerMatches");
        var playerKills = document.getElementById('playerKills');
        var playerDamage = document.getElementById('playerDamage');
        var playerHeadshots = document.getElementById("playerHeadshots");

        btnPC.addEventListener('click', function(){

            btnPC.className = 'buttonOn';
            btnPS4.className = 'buttonOff';
            btnXBOX.className = 'buttonOff';
            platform = 'pc';

        });

        btnPS4.addEventListener('click', function(){

            btnPC.className = 'buttonOff';
            btnPS4.className = 'buttonOn';
            btnXBOX.className = 'buttonOff';
            platform = 'psn';

        });

        btnXBOX.addEventListener('click', function(){

            btnPC.className = 'buttonOff';
            btnPS4.className = 'buttonOff';
            btnXBOX.className = 'buttonOn';
            platform = 'xbl';

        });

        btnSearch.addEventListener('click', function(){

            xhrA.open("GET", (nameURL + platform + '&search=' + document.getElementById("nameInput").value));
            xhrA.send();
            xhrA.timeout=6000;

            xhrA.onreadystatechange = function() {

                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    var playerAid = JSON.parse(this.response);
                    if (playerAid.totalresults === 0) {
                        navigator.notification.alert("Try Re-Entering the Player's Name", null, "Player Not Found");
                    }
                    else {
                        playerAid = playerAid.results[0].aid;

                        xhrB.open("GET", idURL + playerAid);
                        xhrB.send();
                        xhrB.timeout=6000;

                        xhrB.onreadystatechange = function() {
                            if (xhrB.readyState === XMLHttpRequest.DONE && xhrB.status === 200) {
                                var stats = JSON.parse(xhrB.response);
                                playerAvatar.src = stats.avatar;
                                playerInfo.innerText = stats.name + "\nRank: #" + stats.globalrank;
                                playerLegend.value = stats.legend;
                                playerLevel.innerText = stats.level;
                                playerKills.innerText = stats.kills;
                                playerDamage.innerText = stats.damage;
                                playerMatches.innerText = stats.matches;
                                playerHeadshots.innerText = stats.headshots;


                                //After all information has been set, reveals the stats
                                document.getElementById('nameInput').value = "";
                                playerDisplay.className = "shown";
                                homeDisplay.className = "hidden";

                            }

                        }
                    }
                }
            };
        });

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }
};

app.initialize();