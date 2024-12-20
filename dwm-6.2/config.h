/* See LICENSE file for copyright and license details. */

#include "selfrestart.c"
#include <X11/XF86keysym.h>
#include "grid.c"

/* appearance */
static const unsigned int borderpx  = 1;        /* border pixel of windows */
static const unsigned int gappx     = 4;        /* gaps between windows */
static const unsigned int snap      = 32;       /* snap pixel */
static const int showbar            = 1;        /* 0 means no bar */
static const int topbar             = 1;        /* 0 means bottom bar */
static const char *fonts[]          = { "UbuntuMono Nerd Font:size=10" };
static const char dmenufont[]       = "UbuntuMono Nerd Font:size=10";
static const char col_black[]       = "#000000";
static const char col_gray2[]       = "#444444";
static const char col_white[]       = "#ffffff";
static const char col_gray4[]       = "#ffffff";
static const char col_cyan[]        = "#00cc33";
static const char col_bhagua[]		= "#f47932";
static const char col_pink[]		= "#f90040";
static const char col_krish[]		= "#4f004f";
static const unsigned int baralpha = 0x96;
static const unsigned int borderalpha = OPAQUE;
static const char *colors[][3]      = {
	/*               fg         bg         border   */
	[SchemeNorm] = { col_white, col_black, col_gray2 },
	[SchemeSel]  = { col_black, col_cyan,  col_cyan  },
};
static const unsigned int alphas[][3]      = {
	/*               fg      bg        border     */
	[SchemeNorm] = { OPAQUE, baralpha, borderalpha },
	[SchemeSel]  = { OPAQUE, baralpha, borderalpha },
};
/* tagging */
/* static const char *tags[] = { "1", "2", "3", "4", "5", "6", "7", "8", "9" }; */
static const char *tags[] = { "1", "2", "3", "4", "5", "6", "7", "8", "9"};

static const Rule rules[] = {
	/* xprop(1):
	 *	WM_CLASS(STRING) = instance, class
	 *	WM_NAME(STRING) = title
	 */
	/* class                instance     title       tags    mask    isfloating   monitor */
	{ "Gimp",         		  NULL,       NULL,       0,              1,           -1 },
	{ "Firefox",      		  NULL,       NULL,       1 <<    0,      0,           -1 }, 
	{ "Telegram",		      NULL,       NULL,       1 <<    6,      0,           -1 },
	{ "Geany",        		  NULL,       NULL,       1 <<    3,      0,           -1 },
	{ "Thunderbird",  	  	  NULL,       NULL,       1 <<    7,      0,           -1 },
	{ "Clementine",  	  	  NULL,       NULL,       1 <<    8,      0,           -1 },
	{ "Gedit",  	  	      NULL,       NULL,       1 <<    3,      0,           -1 },
};

/* layout(s) */
static const float mfact     = 0.55; /* factor of master area size [0.05..0.95] */
static const int nmaster     = 1;    /* number of clients in master area */
static const int resizehints = 1;    /* 1 means respect size hints in tiled resizals */

static const Layout layouts[] = {
	/* symbol     arrange function */
	{ "tile",      tile },    /* first entry is default */
	{ "float",      NULL },    /* no layout function means floating behavior */
	{ "full",      monocle },
	{ "grid",	   grid },
};

/* key definitions */
#define MODKEY Mod4Mask
#define TAGKEYS(KEY,TAG) \
	{ MODKEY,                       KEY,      view,           {.ui = 1 << TAG} }, \
	{ MODKEY|ControlMask,           KEY,      toggleview,     {.ui = 1 << TAG} }, \
	{ MODKEY|ShiftMask,             KEY,      tag,            {.ui = 1 << TAG} }, \
	{ MODKEY|ControlMask|ShiftMask, KEY,      toggletag,      {.ui = 1 << TAG} },

/* helper for spawning shell commands in the pre dwm-5.0 fashion */
#define SHCMD(cmd) { .v = (const char*[]){ "/bin/sh", "-c", cmd, NULL } }

/* commands */
static char dmenumon[2] = "0"; /* component of dmenucmd, manipulated in spawn() */
static const char *dmenucmd[] = { "dmenu_run", "-m", dmenumon, "-fn", dmenufont, "-nb", col_black, "-nf", col_white, "-sb", col_cyan, "-sf", col_gray4, NULL };
static const char *termcmd[]  = { "urxvt", NULL };
static const char *upvol[] = { "amixer", "-q", "sset", "Master", "4%+", NULL };
static const char *downvol[] = { "amixer", "-q", "sset", "Master", "4%-", NULL };
static const char *mute[] = { "amixer", "-q", "-D", "pulse", "sset", "Master", "toggle", NULL };
static const char *brightup[] = { "xbacklight", "-inc", "5", NULL };
static const char *brightdown[] = { "xbacklight", "-dec", "5", NULL };
static const char *brightmin[] = { "xbacklight", "-set", "1", NULL };
static const char *brightmax[] = { "xbacklight", "-set", "100", NULL };
static const char *telegram[] = { "telegram-desktop", NULL };
static const char *geany[] = { "geany", NULL };
static const char *gedit[] = { "gedit", NULL };
static const char *pcmanfm[] = { "pcmanfm", NULL };
static const char *thunar[] = { "thunar", NULL };
static const char *thunderbird[] = { "thunderbird", NULL };
static const char *firefox[] = { "firefox", NULL };
static const char *ss[] = { "xfce4-screenshooter", NULL };
static const char *terminator[] = { "terminator", NULL };
static const char *urxvt[] = { "urxvt", NULL };
static const char *qute[] = { "qutebrowser", NULL };
static const char *oku[] = { "okular", NULL };
static const char *appf[] = { "xfce4-appfinder", NULL };
static const char *bluem[] = { "blueman-manager", NULL };
static const char *pavu[] = { "pavucontrol", NULL };


static Key keys[] = {
	/* modifier                     key        function        argument */
	{ MODKEY,                       XK_d,      spawn,          {.v = dmenucmd } },
	{ MODKEY|ShiftMask,             XK_Return, spawn,          {.v = termcmd } },
	{ MODKEY,                       XK_b,      togglebar,      {0} },
	{ MODKEY,                       XK_j,      focusstack,     {.i = +1 } },
	{ MODKEY,                       XK_k,      focusstack,     {.i = -1 } }, 
	{ MODKEY,                       XK_x,      incnmaster,     {.i = +1 } },
	{ MODKEY,                       XK_z,      incnmaster,     {.i = -1 } }, 
	{ MODKEY,                       XK_h,      setmfact,       {.f = -0.05} }, 
	{ MODKEY,                       XK_l,      setmfact,       {.f = +0.05} },
	{ MODKEY|ShiftMask,             XK_j,      rotatestack,    {.i = +1 } },
	{ MODKEY|ShiftMask,             XK_k,      rotatestack,    {.i = -1 } },
	{ MODKEY|ControlMask,           XK_comma,  cyclelayout,    {.i = -1 } },
	{ MODKEY|ControlMask,           XK_period, cyclelayout,    {.i = +1 } },
	{ MODKEY,                       XK_Return, zoom,           {0} },
	{ MODKEY,                       XK_Tab,    view,           {0} },
	{ ControlMask,                  XK_q,      killclient,     {0} },
	{ MODKEY,                       XK_u,      setlayout,      {.v = &layouts[0]} },
	{ MODKEY,                       XK_i,      setlayout,      {.v = &layouts[1]} },
	{ MODKEY,                       XK_o,      setlayout,      {.v = &layouts[2]} },
	{ MODKEY,                       XK_y,      setlayout,      {.v = &layouts[3]} },
	{ MODKEY,                       XK_space,  setlayout,      {0} },
	{ MODKEY|ShiftMask,             XK_space,  togglefloating, {0} },
	{ MODKEY,                       XK_0,      view,           {.ui = ~0 } },
	{ MODKEY|ShiftMask,             XK_0,      tag,            {.ui = ~0 } },
	{ MODKEY,                       XK_comma,  focusmon,       {.i = -1 } },
	{ MODKEY,                       XK_period, focusmon,       {.i = +1 } },
	{ MODKEY|ShiftMask,             XK_comma,  tagmon,         {.i = -1 } },
	{ MODKEY|ShiftMask,             XK_period, tagmon,         {.i = +1 } },
	{ MODKEY,                       XK_t,      spawn,          {.v = telegram } },
	{ MODKEY,                       XK_s,      spawn,          {.v = urxvt } },
	{ MODKEY,                       XK_m,      spawn,          {.v = thunderbird } },
	{ MODKEY,                       XK_g,      spawn,          {.v = geany } },
	{ MODKEY|ShiftMask,             XK_g,      spawn,          {.v = gedit } },
	{ MODKEY,                       XK_f,      spawn,          {.v = pcmanfm } },
	{ MODKEY,                       XK_n,      spawn,          {.v = thunar } },
	{ MODKEY,                       XK_p,      spawn,          {.v = firefox } },
	{ MODKEY|ShiftMask,             XK_t,      spawn,          {.v = terminator } },
	{ MODKEY|ShiftMask,             XK_b,      spawn,          {.v = bluem } },
	{ MODKEY|ShiftMask,             XK_p,      spawn,          {.v = pavu } },
	{ MODKEY|ShiftMask,             XK_o,      spawn,          {.v = oku } },
	{ MODKEY,                       XK_q,      spawn,          {.v = qute } },
	{ MODKEY|ControlMask,             XK_d,      spawn,          {.v = appf } },
	{ 0,                            XK_Print,  spawn,      {.v = ss } },
	{ MODKEY|ShiftMask, 			XK_r, 		self_restart,	{0} },
    { 0,              XF86XK_AudioRaiseVolume, spawn,          {.v = upvol } },
    { 0,              XF86XK_AudioLowerVolume, spawn,          {.v = downvol } },
    { 0,              XF86XK_AudioMute,        spawn,          {.v = mute } },
    { 0,              XF86XK_MonBrightnessUp,  spawn,          {.v = brightup } },
    { 0,              XF86XK_MonBrightnessDown,        spawn,          {.v = brightdown } },
    { MODKEY,         XF86XK_MonBrightnessUp,        spawn,          {.v = brightmax } },
    { MODKEY,         XF86XK_MonBrightnessDown,        spawn,          {.v = brightmin } },
    { ControlMask|ShiftMask,        XK_l,      spawn,	       SHCMD("i3lock-fancy") },
    { ControlMask|ShiftMask,        XK_u,      spawn,	       SHCMD("sudo rfkill block wlan") },
    { ControlMask|ShiftMask,        XK_d,      spawn,	       SHCMD("sudo rfkill unblock wlan") },
//  { ControlMask|ShiftMask,        XK_s,      spawn,	       SHCMD("urxvt -e bash -c \"while true; do ~/bin/caa; done ;$SHELL\"") },
    { ControlMask|ShiftMask,        XK_w,      spawn,	       SHCMD("urxvt -e bash -c \"sudo rm -rf /tmp/create_ap.all.lock; sudo create_ap wlp2s0 wlp2s0 yele 0987654321 ;$SHELL\"") },
	TAGKEYS(                        XK_1,                      0)
	TAGKEYS(                        XK_2,                      1)
	TAGKEYS(                        XK_3,                      2)
	TAGKEYS(                        XK_4,                      3)
	TAGKEYS(                        XK_5,                      4)
	TAGKEYS(                        XK_6,                      5)
	TAGKEYS(                        XK_7,                      6)
	TAGKEYS(                        XK_8,                      7)
	TAGKEYS(                        XK_9,                      8)
	{ MODKEY|ShiftMask,             XK_q,      quit,           {0} },
};

/* button definitions */
/* click can be ClkTagBar, ClkLtSymbol, ClkStatusText, ClkWinTitle, ClkClientWin, or ClkRootWin */
static Button buttons[] = {
	/* click                event mask      button          function        argument */
	{ ClkLtSymbol,          0,              Button1,        setlayout,      {0} },
	{ ClkLtSymbol,          0,              Button3,        setlayout,      {.v = &layouts[2]} },
	{ ClkWinTitle,          0,              Button2,        zoom,           {0} },
	{ ClkStatusText,        0,              Button2,        spawn,          {.v = termcmd } },
	{ ClkClientWin,         MODKEY,         Button1,        movemouse,      {0} },
	{ ClkClientWin,         MODKEY,         Button2,        togglefloating, {0} },
	{ ClkClientWin,         MODKEY,         Button3,        resizemouse,    {0} },
	{ ClkTagBar,            0,              Button1,        view,           {0} },
	{ ClkTagBar,            0,              Button3,        toggleview,     {0} },
	{ ClkTagBar,            MODKEY,         Button1,        tag,            {0} },
	{ ClkTagBar,            MODKEY,         Button3,        toggletag,      {0} },
};

