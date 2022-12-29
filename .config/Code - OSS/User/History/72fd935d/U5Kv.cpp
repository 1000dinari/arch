#include<iostream>
#include<bits/stdc++.h>
using namespace std;
class Account {
    public:
    float var1=6;
};

class Programmer : public Account {
    public:
    float var2=5;
};

int main(void) {
    Programmer p1;
    cout<<p1.var1<<p1.var2;
    return 0;
}